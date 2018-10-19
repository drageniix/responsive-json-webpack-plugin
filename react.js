"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var React = __importStar(require("react"));
var makeImageSrcSet = function (srcSets, imagePath) { return srcSets.map(function (img) { return "" + imagePath + img.src + " " + img.size + "w"; }).join(", "); };
var ResponsiveImage = function (_a) {
    var image = _a.image, className = _a.className, alt = _a.alt, _b = _a.imagePath, imagePath = _b === void 0 ? "/" : _b;
    return (image.sources && !!window.HTMLPictureElement ?
        React.createElement("picture", null,
            image.sources && image.sources.map(function (source, index) { return (React.createElement("source", { key: index, srcSet: source.srcset && makeImageSrcSet(source.srcset, imagePath), sizes: source.sizes, media: source.media })); }),
            React.createElement("img", { src: "" + imagePath + image.src, srcSet: image.srcset && makeImageSrcSet(image.srcset, imagePath), sizes: image.sizes, alt: alt || image.alt || image.src, className: className })) :
        React.createElement("img", { src: "" + imagePath + image.src, srcSet: image.srcset && makeImageSrcSet(image.srcset, imagePath), sizes: image.sizes, alt: alt || image.alt || image.src, className: className }));
};
module.exports = ResponsiveImage;
