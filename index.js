const fs = require("fs-extra")
const sharp = require("sharp")

module.exports = class ResponsiveJSONWebpackPlugin {
    constructor(
        { 
            dataPath = "data", 
            imagePath = "images", 
            sourceTemplates = "src/assets/templates", 
            sourceImages = "src/assets/images", 
            outputFolder = "assets"
        } = {}) {
        
        this.folders = {}
        this.files = {}
        this.slashRegex = new RegExp("/", "g")
        this.stripRegex = /^\/+|^\.\/+|\/+$/g
        this.dirs = {
            dataPath: dataPath.replace(this.stripRegex, ""),
            imagePath: imagePath.replace(this.stripRegex, ""),
            sourceTemplates: sourceTemplates.replace(this.stripRegex, ""),
            sourceImages: sourceImages.replace(this.stripRegex, ""),
            outputFolder: outputFolder.replace(this.stripRegex, "")
        }
    }

    run(compilation){
        const dependencies = this.getChangedDependencies(compilation)

        this.processedFileNames = []
        this.assets = compilation.assets
        this.folders = dependencies.folders
        this.files = dependencies.files

        return this.processDataFolders(
            dependencies.changedFolders,
        ).then(() => this.processRawFiles(
            dependencies.changedPureFiles,
        ))
    }

    apply(compiler) {
        const self = this
        compiler.hooks.emit.tapPromise("ResponsiveJSONPlugin", this.run.bind(self))
    }

    saveJSON(folder, jsonMap) {
        const stringData = JSON.stringify(Object.assign({}, ...jsonMap))
        this.assets[`./${this.dirs.outputFolder}/${this.dirs.dataPath}/${folder}.json`] = {
            source: () => Buffer.from(stringData),
            size: () => stringData.length,
        }
    }

    savePicture(sourceFilePath, { src, size }) {
        if (!this.processedFileNames.includes(src)) {
            this.processedFileNames.push(src)
            return sharp(sourceFilePath).resize(size).toBuffer({ resolveWithObject: true })
                .then(({ data, info }) => { //todo: webp fallback
                    this.assets[`./${src}`] = {
                        source: () => data,
                        size: () => info.size,
                    }
                })
        } else return Promise.resolve()
    }

    processRawFiles(dataFiles) {
        return Promise.all(dataFiles.map(file =>
            fs.readJSON(file).then(json =>
                Promise.all(json.map(({ files, alternates }) =>
                    this.processRawItem(files, alternates))))
        ))
    }

    processDataFolders(dataFolders) {
        return Promise.all(dataFolders.map(folder =>
            fs.readdir(`${this.dirs.sourceTemplates}/${folder}/${this.dirs.dataPath}`)
                .then(dataFiles => this.processDataFiles(folder, dataFiles))
                .then(jsonMap => this.saveJSON(folder, jsonMap))
        ))
    }

    processDataFiles(folder, dataFiles) {
        return Promise.all(dataFiles.map(file =>
            fs.readJSON(`${this.dirs.sourceTemplates}/${folder}/${this.dirs.dataPath}/${file}`)
                .then(data => fs.exists(`${this.dirs.sourceTemplates}/${folder}/${this.dirs.imagePath}/${file}`)
                    .then(exists => {
                        if(exists){
                            return fs.readJSON(`${this.dirs.sourceTemplates}/${folder}/${this.dirs.imagePath}/${file}`)
                                .then(images => this.injectImagesIntoDataFile(images, data))
                        }})
                    .then(() => {
                        const jsonKey = file.startsWith("_") ? file.substring(1, file.lastIndexOf(".")) : file.substring(0, file.lastIndexOf(".")) 
                        return { [jsonKey]: data }
                    })
                )
        ))
    }
    
    processRawItem(files, alternates){
        return Promise.all(files.map(({ src, size, dest }) => {
            const srcName = src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."))
            const source = {
                size,
                name: (dest && dest.slice(dest.lastIndexOf("/") + 1).replace("[name]", srcName)) || srcName,
                extension: src.slice(src.lastIndexOf("."))
            }

            return alternates ?
                Promise.all(alternates.map(alter => this.savePicture(
                    `${this.dirs.sourceImages}/${src}`,
                    { src: this.generateFileName(source, alter.dest), size: alter.size, },
                    source.extension
                )))
                : this.savePicture(
                    `${this.dirs.sourceImages}/${src}`,
                    { src: this.generateFileName(source, dest), size },
                    source.extension
                )
        }))
    }

    injectImagesIntoDataFile(images, data){
        return Promise.all(images.map(entry => entry.set ?
            Promise.all(entry.set.map(async (item, index) =>
                this.createPortionPictures(item).then(portion =>
                    this.index(data, entry.path.replace("[]", index), portion))
            )) :
            this.createPortionPictures(entry).then(portion => 
                this.index(data, entry.path, portion)
            )
        ))
    }

    createPortionPictures(entry) {
        return Promise.all(entry.files.map((item, index) => {
            const source = this.parseSource(entry.files.length, entry.alt, index, item)
            const resultPortion = {}
            return this.createPictureSources(source, entry.imageTemplate)
                .then(pSources => resultPortion.sources = pSources)
                .then(() => this.createPictureImg(source, entry.imageTemplate))
                .then(pImg => resultPortion.img = pImg)
                .then(() => this.createImg(source, item.dest))
                .then(img => ({ ...img, ...resultPortion }))

        })).then(files => files.length === 1 ? files[0] : files)
    }

    createPictureSources(source, { sources } = {}) {
        if (sources) {
            return Promise.all(sources.map(pictureSourcesPartial => {
                const pictureSource = {
                    media: pictureSourcesPartial.media,
                    sizes: pictureSourcesPartial.sizes,
                    srcset: pictureSourcesPartial.srcset.map(srcItem => ({
                        file: srcItem.src,
                        src: this.generateFileName(source, srcItem.dest),
                        size: srcItem.size
                    }))
                }

                return Promise.all(pictureSource.srcset.map(
                    srcItem => {
                        const file = srcItem.file; delete srcItem.file
                        return this.savePicture(`${this.dirs.sourceImages}/${file}`, srcItem, source.extension)
                    })).then(() => pictureSource)
            }))
        } else return Promise.resolve()
    }

    createPictureImg(source, { img } = {}) {
        if (img) {
            const pictureImg = {
                sizes: img.sizes,
                srcset: img.srcset.map(srcItem => ({
                    src: this.generateFileName(source, srcItem.dest),
                    size: srcItem.size
                }))
            }

            return Promise.all(pictureImg.srcset.map(
                srcItem => this.savePicture(`${this.dirs.sourceImages}/${source.src}`, srcItem, source.extension))
            ).then(() => pictureImg)
        } else return Promise.resolve()
    }

    createImg(source, dest) {
        const img = {
            src: this.generateFileName(source, dest),
            size: source.size,
            alt: source.alt
        }

        return this.savePicture(`${this.dirs.sourceImages}/${source.src}`, img, source.extension)
            .then(() => img)
    }

    parseSource(filesLength, alt, index, item) {
        const srcName = item.src.slice(item.src.lastIndexOf("/") + 1, item.src.lastIndexOf("."))
        const entryIndex = filesLength > 1 ? index + 1 : 0
        return {
            index: entryIndex,
            alt: alt && entryIndex ? alt + " " + entryIndex : alt,
            name: (item.dest && item.dest.slice(item.dest.lastIndexOf("/") + 1).replace("[name]", srcName)) || srcName,
            extension: item.src.slice(item.src.lastIndexOf(".")),
            src: item.src,
            size: item.size
        }
    }

    stripInvalid(str){
        return str && typeof str === "string" ? str.replace(/[|&$%@"<>()+,]/g, "") : undefined
    }

    generateFileName({ name, index, size, extension } = {}, dest) {
        let filename = this.stripInvalid(dest ?
            dest
                .replace("[name]", name)
                .replace("[index]", index ? index : 1)
                .replace("[size]", size ? size : "")
            : name)

        if (!filename) {
            throw new Error("Invalid destination name.")
        }

        return `${this.dirs.outputFolder}/${this.dirs.imagePath}/${filename}${extension}`
    }

    index(obj, objPath, value) {
        if (typeof objPath == "string")
            return this.index(obj, objPath.split("."), value)
        else if (objPath.length == 1 && value !== undefined)
            return obj[objPath[0]] = value
        else if (objPath.length == 0)
            return obj
        else return this.index(
            obj[(isNaN(objPath[0]) ? objPath[0] : parseInt(objPath[0]))],
            objPath.slice(1),
            value)
    }

    getDependencies(dir, compilationDependenciesSet, rootdir, dependencies) {
        const list = fs.readdirSync(dir)
        list.forEach(file => {
            file = dir + "/" + file
            const stat = fs.statSync(file)
            if (stat && stat.isDirectory()) {
                this.getDependencies(file, compilationDependenciesSet, rootdir, dependencies)
            } else {
                if (file.slice(file.lastIndexOf(".")) === ".json") {
                    dependencies.push(file)
                    compilationDependenciesSet.add(rootdir + "\\" + file.replace(this.slashRegex, "\\"))
                }
            }
        })
    }

    getChangedDependencies(compilation) {
        const folders = {}
        const files = {}
        const changedFolders = new Set()
        const changedPureFiles = []
        const fileDependencies = []

        compilation.contextDependencies.add(compilation.compiler.context + "\\" + this.dirs.sourceTemplates.replace(this.slashRegex, "\\"))
        this.getDependencies(this.dirs.sourceTemplates, compilation.fileDependencies, compilation.compiler.context, fileDependencies)

        fileDependencies.forEach(rawFileName => {
            const folderFile = rawFileName.slice(rawFileName.indexOf(this.dirs.sourceTemplates) + this.dirs.sourceTemplates.length + 1, rawFileName.lastIndexOf("/"))
            const folder = folderFile.slice(0, folderFile.indexOf("/"))
            const group = folderFile.slice(folderFile.indexOf("/") + 1)

            const time = fs.statSync(rawFileName).mtime.getTime()
            if ((group === this.dirs.dataPath || group === this.dirs.imagePath) && folder){
                folders[folder] = folders[folder] ? folders[folder] : {
                    lastUpdate: [],
                    filenames: []
                }
                
                folders[folder].lastUpdate.push(time)
                folders[folder].filenames.push(rawFileName.slice(rawFileName.lastIndexOf(group)))
            } else {
                if (this.files[rawFileName] !== time) {
                    changedPureFiles.push(rawFileName)
                }
                files[rawFileName] = time 
            }
        })

        for (let folder in folders){
            folders[folder].lastUpdate = folders[folder].lastUpdate.sort().reverse()[0]
            if(!this.folders[folder] || 
                this.folders[folder].lastUpdate < folders[folder].lastUpdate ||
                this.folders[folder].filenames.length != folders[folder].filenames.length
            ){
                changedFolders.add(folder)
            }
        }

        return {
            folders,
            files,
            changedFolders: Array.from(changedFolders),
            changedPureFiles
        }
    }
}