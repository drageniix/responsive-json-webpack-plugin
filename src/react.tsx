import * as React from 'react';

const makeImageSrcSet = (srcSets, imagePath) =>
    srcSets.map(img => `${imagePath}${img.src} ${img.size}w`).join(', ');

type individualImage = {
    src: string;
    size: number;
};

type source = {
    media: string;
    sizes: string;
    srcset: Array<individualImage>;
};

type jsonImage = {
    src: string;
    alt?: string;
    size: number; //not used
    sizes?: string;
    srcset?: Array<individualImage>;
    sources?: Array<source>;
};

const ResponsiveImage = ({
    image,
    className,
    alt,
    imagePath = '/'
}: {
    image: jsonImage;
    className?: string;
    alt?: string;
    imagePath?: string;
}) =>
    image.sources && window && !!(window as any).HTMLPictureElement ? (
        <picture>
            {image.sources &&
                image.sources.map((source, index) => (
                    <source
                        key={index}
                        srcSet={
                            source.srcset &&
                            makeImageSrcSet(source.srcset, imagePath)
                        }
                        sizes={source.sizes}
                        media={source.media}
                    />
                ))}

            <img
                src={`${imagePath}${image.src}`}
                srcSet={
                    image.srcset && makeImageSrcSet(image.srcset, imagePath)
                }
                sizes={image.sizes}
                alt={alt || image.alt || image.src}
                className={className}
            />
        </picture>
    ) : (
        <img
            src={`${imagePath}${image.src}`}
            srcSet={image.srcset && makeImageSrcSet(image.srcset, imagePath)}
            sizes={image.sizes}
            alt={alt || image.alt || image.src}
            className={className}
        />
    );

export = ResponsiveImage;
