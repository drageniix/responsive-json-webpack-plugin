"use strict";
var React = require("react");
var PropTypes = require("prop-types");

var makeImageSrcSet = function makeImageSrcSet(srcSets, imagePath) {
    return srcSets.map(function (img) {
        return "".concat(imagePath).concat(img.src, " ").concat(img.size, "w");
    }).join(", ");
};
var ResponsiveImage = function ResponsiveImage(_ref) {
    var className = _ref.className,
        image = _ref.image,
        alt = _ref.alt,
        _ref$imagePath = _ref.imagePath,
        imagePath = _ref$imagePath === void 0 ? "/" : _ref$imagePath;
    return image.sources && !!window.HTMLPictureElement ? React.createElement("picture", null, image.sources && image.sources.map(function (source, index) {
        return React.createElement("source", {
            key: index,
            srcSet: source.srcset && makeImageSrcSet(source.srcset, imagePath),
            sizes: source.sizes,
            media: source.media
        });
    }), React.createElement("img", {
        src: "".concat(imagePath).concat(image.src),
        srcSet: image.srcset && makeImageSrcSet(image.srcset, imagePath),
        sizes: image.sizes,
        alt: alt || image.alt || image.src,
        className: className
    })) : React.createElement("img", {
        src: "".concat(imagePath).concat(image.src),
        srcSet: image.srcset && makeImageSrcSet(image.srcset, imagePath),
        sizes: image.sizes,
        alt: alt || image.alt || image.src,
        className: className
    });
};

ResponsiveImage.propTypes = {
    className: PropTypes.string,
    alt: PropTypes.string,
    image: PropTypes.object.isRequired,
    imagePath: PropTypes.string
};
module.exports = ResponsiveImage;
