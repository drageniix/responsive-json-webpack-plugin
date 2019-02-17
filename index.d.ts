import sharp, { ResizeOptions } from "sharp";
import { srcAlter, srcEntry, rawSrcImg, srcSet, srcImg, sourceBase, imageTemplate } from "./types";
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
    logErrors(path: string, err: string): void;
    saveJSON(folder: string, jsonMap: Array<object>): void;
    savePicture(sourceFilePath: string, { src, size }: {
        src: string;
        size: number | ResizeOptions;
    }): Promise<void>;
    processDirectFiles(dataFiles: Array<string>): Promise<void[]>;
    processRawFiles(dataFiles: Array<string>): Promise<(void | (void | void[])[][])[]>;
    validateRawFiles(data: Array<object>): object[];
    processRawItem(file: string, rawItem: rawSrcImg, alternates?: Array<srcAlter>): Promise<void | void[]>;
    processRawItemObject(rawItem: srcImg, alternates?: Array<srcAlter>): Promise<void>;
    processRawItemString(rawItem: string, alternates: Array<srcAlter>): Promise<void[]>;
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
        size: number | sharp.ResizeOptions;
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
        size?: number | ResizeOptions;
        extension?: string;
    }, dest?: string): string;
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
