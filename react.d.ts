/// <reference types="react" />
declare type individualImage = {
    src: string;
    size: number;
};
declare type source = {
    media: string;
    sizes: string;
    srcset: Array<individualImage>;
};
declare type jsonImage = {
    src: string;
    alt?: string;
    size: number;
    sizes?: string;
    srcset?: Array<individualImage>;
    sources?: Array<source>;
};
declare const ResponsiveImage: ({ image, className, alt, imagePath }: {
    image: jsonImage;
    className?: string;
    alt?: string;
    imagePath?: string;
}) => JSX.Element;
export = ResponsiveImage;
