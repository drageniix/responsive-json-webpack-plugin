import * as React from "react";

const makeImageSrcSet = (srcSets: individualImage[], imagePath: string) =>
  srcSets
    .map((img: individualImage) => `${imagePath}${img.src} ${img.size}w`)
    .join(", ");

type individualImage = {
  src: string;
  size: number;
};

type source = {
  media: string;
  sizes: string;
  srcset: Array<individualImage>;
};

const ResponsiveImage = props => {
  const { image, className, alt, imagePath = "/", ...other } = props;

  return image.sources && window && !!(window as any).HTMLPictureElement ? (
    <picture {...other}>
      {image.sources &&
        image.sources.map((source: source, index: number) => (
          <source
            key={index}
            srcSet={source.srcset && makeImageSrcSet(source.srcset, imagePath)}
            sizes={source.sizes}
            media={source.media}
          />
        ))}

      <img
        src={`${imagePath}${image.src}`}
        srcSet={image.srcset && makeImageSrcSet(image.srcset, imagePath)}
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
      {...other}
    />
  );
};

export = ResponsiveImage;
