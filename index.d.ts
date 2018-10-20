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
    private options;
    private dirs;
    private slashRegex;
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
    processRawItem(files: any, alternates?: Array<srcAlter>): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
    processDataFolders(dataFolders: Array<string>): Promise<void[]>;
    processDataFiles(folder: string, dataFiles: Array<string>): Promise<{
        [x: string]: any;
    }[]>;
    injectImagesIntoDataFile(images: Array<srcEntry>, data: object): Promise<any[]>;
    createPortionPictures(entry: srcEntry | srcSet): Promise<object>;
    createPictureSources(source: sourceBase, { sources }?: imageTemplate): Promise<void> | Promise<{
        media: string;
        sizes: string;
        srcset: srcImg[];
    }[]>;
    createImgResolutions(source: any, { img }?: imageTemplate): Promise<{}>;
    createImg(source: sourceBase, dest?: string): Promise<{
        src: string;
        size: number;
        alt: string;
    }>;
    parseSource(filesLength: number, index: number, item: srcImg, alt?: string): sourceBase;
    parseRawSource({ size, src, dest }: srcImg): sourceBase;
    getLastSlash(str: string): number;
    stripInvalid(str: any): string;
    generateFileName({ name, index, size, extension }?: {
        name?: string;
        index?: number;
        size?: number;
        extension?: string;
    }, dest?: any): string;
    index(obj: object, objPath: (string | Array<string>), value: any): any;
    getDependencies({ contextDependencies, fileDependencies, compiler: { context } }: {
        contextDependencies: any;
        fileDependencies: any;
        compiler: {
            context: any;
        };
    }): Array<string>;
    readFolderDependencies(dir: string, context: string, dependencies: Array<string>): Array<string>;
    getChangedDependencies(fileDependencies: any): {
        folders: {};
        files: {};
        changedFolders: any[];
        changedPureFiles: any[];
    };
}
export = ResponsiveJSONWebpackPlugin;
