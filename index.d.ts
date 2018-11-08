declare type srcImg = {
    src: string;
    size: number;
    dest?: string;
};
declare type srcAlter = {
    dest: string;
    size: number;
};
declare type imageTemplate = {
    img?: {
        sizes?: string;
        srcset: Array<srcAlter>;
    };
    sources?: Array<{
        media?: string;
        sizes?: string;
        srcset: Array<srcImg>;
    }>;
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
    private establishedDependencies;
    private assets;
    constructor({ dataPath, imagePath, rawFolder, sourceTemplates, sourceImages, outputFolder }?: {
        dataPath?: string;
        imagePath?: string;
        rawFolder?: string;
        sourceTemplates?: string;
        sourceImages?: string;
        outputFolder?: string;
    });
    run(compilation: any): Promise<void>;
    apply(compiler: any): void;
    readJSON(file: any): Promise<any>;
    saveJSON(folder: string, jsonMap: Array<object>): void;
    savePicture(sourceFilePath: string, { src, size }: {
        src: string;
        size: number;
    }): Promise<void>;
    processDirectFiles(dataFiles: Array<string>): Promise<void[]>;
    processRawFiles(dataFiles: Array<string>): Promise<(void | [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}])[]>;
    processRawItem(files: any, alternates?: Array<srcAlter>): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
    processDataFolders(dataFolders: Array<string>): Promise<void[]>;
    processDataFiles(folder: string): Promise<[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]>;
    checkImageFile(folder: any, file: any, data: any): Promise<any>;
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
    getFirstSlash(str: string): number;
    getLastSlash(str: string): number;
    stripInvalid(str: any): string;
    generateFileName({ name, index, size, extension }?: {
        name?: string;
        index?: number;
        size?: number;
        extension?: string;
    }, dest?: any): string;
    index(obj: object, objPath: string | Array<string>, value: any): any;
    getDependencies({ contextDependencies, fileDependencies, compiler }: {
        contextDependencies: any;
        fileDependencies: any;
        compiler: any;
    }): {
        folders: {};
        files: {};
        direct: {};
        changedFolders: any[];
        changedPureFiles: any[];
        changedDirectFiles: any[];
        fileDependencies: string[];
        contextDependencies: string[];
    };
    readFolderDependencies(dir: string, context: string, fileDependencies?: Array<string>, contextDependencies?: Array<string>): {
        fileDependencies: string[];
        contextDependencies: string[];
    };
    getChangedDependencies(fileDependencies: any): {
        folders: {};
        files: {};
        direct: {};
        changedFolders: any[];
        changedPureFiles: any[];
        changedDirectFiles: any[];
    };
}
export = ResponsiveJSONWebpackPlugin;
