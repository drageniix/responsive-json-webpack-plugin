import fs from 'fs-extra';
import sharp from 'sharp';
import path from 'path';
import Ajv from 'ajv';

import rawSchema from './schemas/raw-file.json';
import responsiveSchema from './schemas/responsive.json';
const ajv = new Ajv();

const rawValidate = ajv.compile(rawSchema);
const responsiveValidate = ajv.compile(responsiveSchema);

type directoryOptions = {
    dataPath: string;
    imagePath: string;
    sourceTemplates: string;
    sourceImages: string;
    outputFolder: string;
};
type srcImg = {
    src: string;
    size: number;
    dest?: string;
};
type srcAlter = {
    dest: string;
    size: number;
};
type imageTemplateSources = {
    media?: string;
    sizes?: string;
    srcset: Array<srcImg>;
};
type imageTemplate = {
    img?: {
        sizes?: string;
        srcset: Array<srcAlter>;
    };
    sources?: Array<imageTemplateSources>;
};

type srcEntry = {
    path: string;
    alt?: string;
    files: Array<srcImg>;
    set?: Array<srcSet>;
    imageTemplate?: imageTemplate;
};

type srcSet = {
    alt?: string;
    files: Array<srcImg>;
    imageTemplate?: imageTemplate;
};

type sourceBase = {
    index?: number;
    alt?: string;
    name: string;
    extension: string;
    src: string;
    size: number;
};

class ResponsiveJSONWebpackPlugin {
    private options: directoryOptions;
    private dirs: directoryOptions;
    private slashRegex: RegExp = new RegExp(/\\/, 'g');
    private processedFileNames: Array<string>;
    private folders: object = {};
    private files: object = {};
    private direct: object = {};
    private assets: object;

    constructor({
        dataPath = 'data',
        imagePath = 'images',
        sourceTemplates = 'src/assets/templates',
        sourceImages = 'src/assets/images',
        outputFolder = 'assets'
    } = {}) {
        this.dirs = this.options = {
            dataPath,
            imagePath,
            sourceTemplates,
            sourceImages,
            outputFolder
        };
    }

    async run(compilation) {
        this.dirs.sourceTemplates = path
            .resolve(compilation.compiler.context, this.options.sourceTemplates)
            .replace(this.slashRegex, '/');
        this.dirs.sourceImages = path
            .resolve(compilation.compiler.context, this.options.sourceImages)
            .replace(this.slashRegex, '/');

        const dependencies = this.getDependencies(compilation);
        const processedDependencies = this.getChangedDependencies(dependencies);

        this.processedFileNames = [];
        this.assets = compilation.assets;
        this.folders = processedDependencies.folders;
        this.files = processedDependencies.files;
        this.direct = processedDependencies.direct;

        await this.processDataFolders(processedDependencies.changedFolders);
        await this.processRawFiles(processedDependencies.changedPureFiles);
        await this.processDirectFiles(processedDependencies.changedDirectFiles);
    }

    apply(compiler) {
        compiler.hooks.emit.tapPromise(
            'ResponsiveJSONWebpackPlugin',
            this.run.bind(this)
        );
    }

    saveJSON(folder: string, jsonMap: Array<object>) {
        const stringData = JSON.stringify(Object.assign({}, ...jsonMap));
        this.assets[
            `./${this.dirs.outputFolder}/${this.dirs.dataPath}/${folder}.json`
        ] = {
            source: () => Buffer.from(stringData),
            size: () => stringData.length
        };
    }

    async savePicture(
        sourceFilePath: string,
        { src, size }: { src: string; size: number }
    ) {
        if (!this.processedFileNames.includes(src)) {
            this.processedFileNames.push(src);
            try {
                const { data, info } = await sharp(sourceFilePath)
                    .resize(size)
                    .toBuffer({ resolveWithObject: true });
                this.assets[`./${src}`] = {
                    source: () => data,
                    size: () => info.size
                };
            } catch (err) {
                this.processedFileNames.pop();
                console.error(
                    `ResponsiveJSONWebpackPlugin ${err} --"${sourceFilePath}"`
                );
            }
        }
    }

    processDirectFiles(dataFiles: Array<string>) {
        return Promise.all(
            dataFiles.map(file =>
                fs
                    .readJSON(`${this.dirs.sourceTemplates}/raw/${file}.json`)
                    .then(data => this.saveJSON(file, [data]))
            )
        );
    }

    processRawFiles(dataFiles: Array<string>) {
        return Promise.all(
            dataFiles.map(file =>
                fs.readJSON(file).then(data => {
                    const valid = rawValidate(data);
                    if (valid) {
                        return Promise.all(
                            data.map(
                                ({
                                    files,
                                    alternates
                                }: {
                                    files: Array<srcImg>;
                                    alternates?: Array<srcAlter>;
                                }) => this.processRawItem(files, alternates)
                            )
                        );
                    } else {
                        console.error(
                            `ResponsiveJSONWebpackPlugin: ${file}`,
                            '\n',
                            rawValidate.errors
                                .map(
                                    err =>
                                        `path '${err.dataPath}' ${err.message}`
                                )
                                .join(', ')
                        );
                    }
                })
            )
        );
    }

    processRawItem(files, alternates?: Array<srcAlter>) {
        return Promise.all(
            files.map((rawItem: srcImg) => {
                const source = this.parseRawSource(rawItem);
                return alternates
                    ? Promise.all(
                          alternates.map(alter =>
                              this.savePicture(
                                  `${this.dirs.sourceImages}/${rawItem.src}`,
                                  {
                                      src: this.generateFileName(
                                          source,
                                          alter.dest
                                      ),
                                      size: alter.size
                                  }
                              )
                          )
                      )
                    : this.savePicture(
                          `${this.dirs.sourceImages}/${rawItem.src}`,
                          {
                              src: this.generateFileName(source, rawItem.dest),
                              size: rawItem.size
                          }
                      );
            })
        );
    }

    processDataFolders(dataFolders: Array<string>) {
        return Promise.all(
            dataFolders.map(folder =>
                this.processDataFiles(folder).then(jsonMap =>
                    this.saveJSON(folder, jsonMap)
                )
            )
        );
    }

    processDataFiles(folder: string) {
        const dataFiles = this.folders[folder].filenames.filter(name =>
            name.startsWith(this.dirs.dataPath)
        );

        return Promise.all(
            dataFiles.map(file =>
                fs
                    .readJSON(`${this.dirs.sourceTemplates}/${folder}/${file}`)
                    .then(data => this.checkImageFile(folder, file, data))
                    .then(data => {
                        const fileKey = file.replace(
                            `${this.dirs.dataPath}/`,
                            ''
                        );
                        const jsonKey = fileKey.startsWith('_')
                            ? fileKey.substring(1, fileKey.lastIndexOf('.'))
                            : fileKey.substring(0, fileKey.lastIndexOf('.'));
                        return { [jsonKey]: data };
                    })
            )
        );
    }

    async checkImageFile(folder, file, data) {
        const imageFile = file.replace(this.dirs.dataPath, this.dirs.imagePath);
        if (this.folders[folder].filenames.includes(imageFile)) {
            const images = await fs.readJSON(
                `${this.dirs.sourceTemplates}/${folder}/${imageFile}`
            );
            if (responsiveValidate(images)) {
                await this.injectImagesIntoDataFile(images, data);
            } else {
                console.error(
                    `ResponsiveJSONWebpackPlugin: ${file}`,
                    '\n',
                    responsiveValidate.errors
                        .map(err => `path '${err.dataPath}' ${err.message}`)
                        .join(', ')
                );
            }
        }
        return data;
    }

    injectImagesIntoDataFile(images: Array<srcEntry>, data: object) {
        return Promise.all(
            images.map(
                entry =>
                    entry.set
                        ? Promise.all(
                              entry.set.map(async (item, index) =>
                                  this.createPortionPictures(item).then(
                                      portion =>
                                          this.index(
                                              data,
                                              entry.path.replace(
                                                  '[]',
                                                  index.toString()
                                              ),
                                              portion
                                          )
                                  )
                              )
                          )
                        : this.createPortionPictures(entry).then(portion =>
                              this.index(data, entry.path, portion)
                          )
            )
        );
    }

    async createPortionPictures(entry: srcEntry | srcSet) {
        const files: Array<object> = await Promise.all(
            entry.files.map(async (item, index) => {
                const source = this.parseSource(
                    entry.files.length,
                    index,
                    item,
                    entry.alt
                );
                const pictureSources = await this.createPictureSources(
                    source,
                    entry.imageTemplate
                );
                const imgResolutions = await this.createImgResolutions(
                    source,
                    entry.imageTemplate
                );
                const img = await this.createImg(source, item.dest);
                return {
                    ...img,
                    ...imgResolutions,
                    sources: pictureSources
                };
            })
        );
        return files.length === 1 ? files[0] : files;
    }

    createPictureSources(source: sourceBase, { sources }: imageTemplate = {}) {
        if (sources) {
            return Promise.all(
                sources.map(async pictureSourcesPartial => {
                    const pictureSource = {
                        media: pictureSourcesPartial.media,
                        sizes: pictureSourcesPartial.sizes,
                        srcset: pictureSourcesPartial.srcset.map(
                            (srcItem): srcImg => ({
                                dest: srcItem.src,
                                src: this.generateFileName(
                                    source,
                                    srcItem.dest
                                ),
                                size: srcItem.size
                            })
                        )
                    };

                    await Promise.all(
                        pictureSource.srcset.map(srcItem => {
                            const file = srcItem.dest;
                            delete srcItem.dest;
                            return this.savePicture(
                                `${this.dirs.sourceImages}/${file}`,
                                srcItem
                            );
                        })
                    );
                    return pictureSource;
                })
            );
        } else return Promise.resolve();
    }

    async createImgResolutions(source, { img }: imageTemplate = {}) {
        if (img) {
            const imgResolutions = {
                sizes: img.sizes,
                srcset: img.srcset.map(
                    (srcItem): srcImg => ({
                        src: this.generateFileName(source, srcItem.dest),
                        size: srcItem.size
                    })
                )
            };

            await Promise.all(
                imgResolutions.srcset.map(srcItem =>
                    this.savePicture(
                        `${this.dirs.sourceImages}/${source.src}`,
                        srcItem
                    )
                )
            );
            return imgResolutions;
        }
        return {};
    }

    async createImg(source: sourceBase, dest?: string) {
        const img = {
            src: this.generateFileName(source, dest),
            size: source.size,
            alt: source.alt
        };

        await this.savePicture(`${this.dirs.sourceImages}/${source.src}`, img);
        return img;
    }

    parseSource(
        filesLength: number,
        index: number,
        item: srcImg,
        alt?: string
    ): sourceBase {
        const srcName = item.src.slice(
            this.getLastSlash(item.src) + 1,
            item.src.lastIndexOf('.')
        );
        const entryIndex = filesLength > 1 ? index + 1 : 0;
        return {
            index: entryIndex,
            alt: alt && entryIndex ? alt + ' ' + entryIndex : alt,
            name:
                (item.dest &&
                    item.dest
                        .slice(this.getLastSlash(item.dest) + 1)
                        .replace('[name]', srcName)) ||
                srcName,
            extension: item.src.slice(item.src.lastIndexOf('.')),
            src: item.src,
            size: item.size
        };
    }

    parseRawSource({ size, src, dest }: srcImg): sourceBase {
        const srcName = src.slice(
            this.getLastSlash(src) + 1,
            src.lastIndexOf('.')
        );
        return {
            size,
            src,
            name:
                (dest &&
                    dest
                        .slice(this.getLastSlash(dest) + 1)
                        .replace('[name]', srcName)) ||
                srcName,
            extension: src.slice(src.lastIndexOf('.'))
        };
    }

    getFirstSlash(str: string): number {
        const win = str.indexOf('\\');
        const oth = str.indexOf('/');
        return (win < 0 && oth < 0) || win < 0 ? oth : win;
    }

    getLastSlash(str: string): number {
        return Math.max(str.lastIndexOf('\\'), str.lastIndexOf('/'));
    }

    stripInvalid(str) {
        return str && typeof str === 'string'
            ? str.replace(/[|&$%@"<>()+,]/g, '')
            : undefined;
    }

    generateFileName(
        { name = '', index = 0, size = 0, extension = '' } = {},
        dest?
    ): string {
        let filename = this.stripInvalid(
            dest
                ? dest
                      .replace('[name]', name)
                      .replace('[index]', index ? index : 1)
                      .replace('[size]', size ? size : '')
                : name
        );

        if (!filename) {
            throw new Error('Invalid destination name.');
        }

        return `${this.dirs.outputFolder}/${
            this.dirs.imagePath
        }/${filename}${extension}`;
    }

    index(obj: object, objPath: string | Array<string>, value: any) {
        if (typeof objPath == 'string')
            return this.index(obj, objPath.split('.'), value);
        else if (objPath.length == 1 && value !== undefined)
            return (obj[objPath[0]] = value);
        else if (objPath.length == 0) return obj;
        else
            return this.index(
                obj[
                    isNaN(objPath[0] as any) ? objPath[0] : parseInt(objPath[0])
                ],
                objPath.slice(1),
                value
            );
    }

    getDependencies({
        contextDependencies,
        fileDependencies,
        compiler: { context }
    }): Array<string> {
        const dependencies = this.readFolderDependencies(
            this.dirs.sourceTemplates,
            context
        );
        for (let file of dependencies.fileDependencies) {
            fileDependencies.add(file);
        }
        for (let folder of dependencies.contextDependencies) {
            contextDependencies.add(folder);
        }
        return dependencies.fileDependencies;
    }

    readFolderDependencies(
        dir: string,
        context: string,
        fileDependencies: Array<string> = [],
        contextDependencies: Array<string> = []
    ): { fileDependencies: Array<string>; contextDependencies: Array<string> } {
        contextDependencies.push(
            path.resolve(context, dir).replace(this.slashRegex, '/')
        );

        const list = fs.readdirSync(dir);
        list.forEach(file => {
            file = dir + '/' + file;
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                this.readFolderDependencies(
                    file,
                    context,
                    fileDependencies,
                    contextDependencies
                );
            } else if (file.slice(file.lastIndexOf('.')) === '.json') {
                fileDependencies.push(
                    path.resolve(context, file).replace(this.slashRegex, '/')
                );
            }
        });

        return { fileDependencies, contextDependencies };
    }

    getChangedDependencies(fileDependencies) {
        const folders = {};
        const files = {};
        const direct = {};
        const changedFolders = new Set();
        const changedPureFiles = [];
        const changedDirectFiles = [];

        fileDependencies.forEach(rawFileName => {
            const folderFile = rawFileName.slice(
                rawFileName.indexOf(this.dirs.sourceTemplates) +
                    this.dirs.sourceTemplates.length +
                    1,
                this.getLastSlash(rawFileName)
            );
            const folder = folderFile.slice(0, this.getFirstSlash(folderFile));
            const group = folderFile.slice(this.getFirstSlash(folderFile) + 1);
            const fileName = rawFileName.slice(
                this.getLastSlash(rawFileName) + 1,
                rawFileName.lastIndexOf('.')
            );

            const time = fs.statSync(rawFileName).mtime.getTime();
            if (folderFile === 'raw') {
                if (this.direct[rawFileName] !== time) {
                    changedDirectFiles.push(fileName);
                }
                direct[rawFileName] = time;
            } else if (
                (group === this.dirs.dataPath ||
                    group === this.dirs.imagePath) &&
                this.getFirstSlash(folderFile) > 0
            ) {
                folders[folder] = folders[folder]
                    ? folders[folder]
                    : {
                          lastUpdate: [],
                          filenames: []
                      };

                folders[folder].lastUpdate.push(time);
                folders[folder].filenames.push(
                    rawFileName.slice(rawFileName.lastIndexOf(group))
                );
            } else {
                if (this.files[rawFileName] !== time) {
                    changedPureFiles.push(rawFileName);
                }
                files[rawFileName] = time;
            }
        });

        for (let folder in folders) {
            folders[folder].lastUpdate = folders[folder].lastUpdate
                .sort()
                .reverse()[0];
            if (
                !this.folders[folder] ||
                this.folders[folder].lastUpdate < folders[folder].lastUpdate ||
                this.folders[folder].filenames.length !=
                    folders[folder].filenames.length
            ) {
                changedFolders.add(folder);
            }
        }

        return {
            folders,
            files,
            direct,
            changedFolders: Array.from(changedFolders),
            changedPureFiles,
            changedDirectFiles
        };
    }
}

export = ResponsiveJSONWebpackPlugin;
