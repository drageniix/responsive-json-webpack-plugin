import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

//usage: <ResponsiveImage image={} className="" alt="" />

const makeImageSrcSet = (srcSets, imagePath) => srcSets.map(size => `${imagePath}${size.src} ${size.size}w`).join(", ")

export const ResponsiveImage = ({ className, image, alt, imagePath}) => (
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
                srcSet={image.img && image.img.srcset && makeImageSrcSet(image.img.srcset, imagePath)}
                sizes={image.img && image.img.sizes}
                alt={alt || image.alt || image.src}
                className={className} />
        
        </picture>  :
            
        <img src={`${imagePath}${image.src}`}
            srcSet={image.img && image.img.srcset && makeImageSrcSet(image.img.srcset, imagePath)}
            sizes={image.img && image.img.sizes}
            alt={alt || image.alt || image.src}
            className={className} /> 
)

const mapStateToProps = state => ({
    imagePath: state.imagePath || "/",
})

ResponsiveImage.propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string,
    image: PropTypes.object.isRequired,
    imagePath: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(ResponsiveImage)