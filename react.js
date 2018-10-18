import React from "react"
import PropTypes from "prop-types"

const makeImageSrcSet = (srcSets, imagePath) => srcSets.map(img => `${imagePath}${img.src} ${img.size}w`).join(", ")

const ResponsiveImage = ({ className, image, alt, imagePath = "/"}) => (
    image.sources && !!window.HTMLPictureElement ? 
        <picture>

            {image.sources && image.sources.map((source, index) => (
                <source
                    key={index}
                    srcSet={source.srcset && makeImageSrcSet(source.srcset, imagePath)}
                    sizes={source.sizes}
                    media={source.media} />
            ))}

            <img src={`${imagePath}${image.src}`}
                srcSet={image.srcset && makeImageSrcSet(image.srcset, imagePath)}
                sizes={image.sizes}
                alt={alt || image.alt || image.src}
                className={className} />
        
        </picture>  :
            
        <img src={`${imagePath}${image.src}`}
            srcSet={image.srcset && makeImageSrcSet(image.srcset, imagePath)}
            sizes={image.sizes}
            alt={alt || image.alt || image.src}
            className={className} /> 
)

ResponsiveImage.propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string,
    image: PropTypes.object.isRequired,
    imagePath: PropTypes.string
}

export default ResponsiveImage