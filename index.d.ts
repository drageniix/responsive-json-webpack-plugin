declare type srcImg = {
    src: string;
    size: number;
    dest?: string;
};
declare type srcAlter = {
    dest: string;
    size: number;
};
declare type imageTemplateImg = {
    sizes?: string;
    srcset: Array<srcAlter>;
};
declare type imageTemplateSources = {
    media?: string;
    sizes?: string;
    srcset: Array<srcImg>;
};
declare type imageTemplate = {
    img?: imageTemplateImg;
    sources?: Array<imageTemplateSources>;
};
declare type srcEntry = {
    path: string;
    alt?: string;
    files: Array<srcImg>;
    set?: Array<srcSet>;
    imageTemplate?: imageTemplate;
};
declare type srcSet = {
    alt?: string;
    files: Array<srcImg>;
    imageTemplate?: imageTemplate;
};
declare type sourceBase = {
    index?: number;
    alt?: string;
    name: string;
    extension: string;
    src: string;
    size: number;
};
declare class ResponsiveJSONWebpackPlugin {
    private dirs;
    private slashRegex;
    private stripRegex;
    private processedFileNames;
    private folders;
    private files;
    private assets;
    constructor({ dataPath, imagePath, sourceTemplates, sourceImages, outputFolder }?: {
        dataPath?: string;
        imagePath?: string;
        sourceTemplates?: string;
        sourceImages?: string;
        outputFolder?: string;
    });
    run(compilation: any): Promise<void>;
    apply(compiler: any): void;
    saveJSON(folder: string, jsonMap: Array<object>): void;
    savePicture(sourceFilePath: string, { src, size }: {
        src: string;
        size: number;
    }): Promise<void>;
    processRawFiles(dataFiles: Array<string>): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}][]>;
    processDataFolders(dataFolders: Array<string>): Promise<void[]>;
    processDataFiles(folder: string, dataFiles: Array<string>): Promise<{
        [x: string]: any;
    }[]>;
    processRawItem(files: any, alternates?: Array<srcAlter>): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
    injectImagesIntoDataFile(images: Array<srcEntry>, data: object): Promise<any[]>;
    createPortionPictures(entry: srcEntry | srcSet): Promise<object>;
    createPictureSources(source: sourceBase, { sources }?: imageTemplate): Promise<void> | Promise<{
        media: string;
        sizes: string;
        srcset: {
            file: string;
            src: string;
            size: number;
        }[];
    }[]>;
    createImgResolutions(source: any, { img }?: imageTemplate): Promise<{}>;
    createImg(source: sourceBase, dest?: string): Promise<{
        src: string;
        size: number;
        alt: string;
    }>;
    parseSource(filesLength: number, index: number, item: srcImg, alt?: string): sourceBase;
    stripInvalid(str: any): string;
    generateFileName({ name, index, size, extension }?: {
        name?: string;
        index?: number;
        size?: number;
        extension?: string;
    }, dest?: any): string;
    index(obj: object, objPath: (string | Array<string>), value: any): any;
    getDependencies(dir: string, compilationDependenciesSet: Set<string>, rootdir: string, dependencies: Array<string>): void;
    getChangedDependencies(compilation: any): {
        folders: {};
        files: {};
        changedFolders: any[];
        changedPureFiles: any[];
    };
}
export = ResponsiveJSONWebpackPlugin;
