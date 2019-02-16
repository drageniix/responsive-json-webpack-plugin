export declare type originalOptions = {
    sourceTemplates: string;
    sourceImages: string;
};
export declare type directoryOptions = {
    dataPath: string;
    imagePath: string;
    rawFolder: string;
    sourceTemplates: string;
    sourceImages: string;
    outputFolder: string;
};
export declare type srcImg = {
    src: string;
    size: number;
    dest?: string;
};
export declare type rawSrcImg = srcImg | string;
export declare type rawSrcEntry = {
    files: Array<rawSrcImg>;
    alternates?: Array<srcAlter>;
};
export declare type srcAlter = {
    dest: string;
    size: number;
};
export declare type imageTemplate = {
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
export declare type srcEntry = {
    path: string;
    alt?: string;
    files: Array<srcImg>;
    set?: Array<srcSet>;
    imageTemplate?: imageTemplate;
};
export declare type srcSet = {
    alt?: string;
    files: Array<srcImg>;
    imageTemplate?: imageTemplate;
};
export declare type sourceBase = {
    index?: number;
    alt?: string;
    name: string;
    extension: string;
    src: string;
    size: number;
};
