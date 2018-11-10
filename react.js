"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var React = __importStar(require("react"));
var makeImageSrcSet = function (srcSets, imagePath) {
    return srcSets.map(function (img) { return "" + imagePath + img.src + " " + img.size + "w"; }).join(', ');
};
var ResponsiveImage = function (props) {
    var image = props.image, className = props.className, alt = props.alt, _a = props.imagePath, imagePath = _a === void 0 ? '/' : _a, other = __rest(props, ["image", "className", "alt", "imagePath"]);
    return image.sources && window && !!window.HTMLPictureElement ? (React.createElement("picture", __assign({}, other),
        image.sources &&
            image.sources.map(function (source, index) { return (React.createElement("source", { key: index, srcSet: source.srcset &&
                    makeImageSrcSet(source.srcset, imagePath), sizes: source.sizes, media: source.media })); }),
        React.createElement("img", { src: "" + imagePath + image.src, srcSet: image.srcset && makeImageSrcSet(image.srcset, imagePath), sizes: image.sizes, alt: alt || image.alt || image.src, className: className }))) : (React.createElement("img", __assign({ src: "" + imagePath + image.src, srcSet: image.srcset && makeImageSrcSet(image.srcset, imagePath), sizes: image.sizes, alt: alt || image.alt || image.src, className: className }, other)));
};
module.exports = ResponsiveImage;
