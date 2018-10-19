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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs-extra");
var sharp = require("sharp");
var ResponsiveJSONWebpackPlugin = /** @class */ (function () {
    function ResponsiveJSONWebpackPlugin(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.dataPath, dataPath = _c === void 0 ? "data" : _c, _d = _b.imagePath, imagePath = _d === void 0 ? "images" : _d, _e = _b.sourceTemplates, sourceTemplates = _e === void 0 ? "src/assets/templates" : _e, _f = _b.sourceImages, sourceImages = _f === void 0 ? "src/assets/images" : _f, _g = _b.outputFolder, outputFolder = _g === void 0 ? "assets" : _g;
        this.slashRegex = new RegExp("/", "g");
        this.stripRegex = /^\/+|^\.\/+|\/+$/g;
        this.folders = {};
        this.files = {};
        this.dirs = {
            dataPath: dataPath.replace(this.stripRegex, ""),
            imagePath: imagePath.replace(this.stripRegex, ""),
            sourceTemplates: sourceTemplates.replace(this.stripRegex, ""),
            sourceImages: sourceImages.replace(this.stripRegex, ""),
            outputFolder: outputFolder.replace(this.stripRegex, "")
        };
    }
    ResponsiveJSONWebpackPlugin.prototype.run = function (compilation) {
        return __awaiter(this, void 0, void 0, function () {
            var dependencies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dependencies = this.getChangedDependencies(compilation);
                        this.processedFileNames = [];
                        this.assets = compilation.assets;
                        this.folders = dependencies.folders;
                        this.files = dependencies.files;
                        return [4 /*yield*/, this.processDataFolders(dependencies.changedFolders)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.processRawFiles(dependencies.changedPureFiles)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.apply = function (compiler) {
        compiler.hooks.emit.tapPromise("ResponsiveJSONWebpackPlugin", this.run.bind(this));
    };
    ResponsiveJSONWebpackPlugin.prototype.saveJSON = function (folder, jsonMap) {
        var stringData = JSON.stringify(Object.assign.apply(Object, [{}].concat(jsonMap)));
        this.assets["./" + this.dirs.outputFolder + "/" + this.dirs.dataPath + "/" + folder + ".json"] = {
            source: function () { return Buffer.from(stringData); },
            size: function () { return stringData.length; }
        };
    };
    ResponsiveJSONWebpackPlugin.prototype.savePicture = function (sourceFilePath, _a) {
        var src = _a.src, size = _a.size;
        return __awaiter(this, void 0, void 0, function () {
            var _b, data_1, info_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!!this.processedFileNames.includes(src)) return [3 /*break*/, 2];
                        this.processedFileNames.push(src);
                        return [4 /*yield*/, sharp(sourceFilePath).resize(size).toBuffer({ resolveWithObject: true })];
                    case 1:
                        _b = _c.sent(), data_1 = _b.data, info_1 = _b.info;
                        this.assets["./" + src] = {
                            source: function () { return data_1; },
                            size: function () { return info_1.size; }
                        };
                        _c.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.processRawFiles = function (dataFiles) {
        var _this = this;
        return Promise.all(dataFiles.map(function (file) {
            return fs.readJSON(file).then(function (json) {
                return Promise.all(json.map(function (_a) {
                    var files = _a.files, alternates = _a.alternates;
                    return _this.processRawItem(files, alternates);
                }));
            });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.processDataFolders = function (dataFolders) {
        var _this = this;
        return Promise.all(dataFolders.map(function (folder) {
            return fs.readdir(_this.dirs.sourceTemplates + "/" + folder + "/" + _this.dirs.dataPath)
                .then(function (dataFiles) { return _this.processDataFiles(folder, dataFiles); })
                .then(function (jsonMap) { return _this.saveJSON(folder, jsonMap); });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.processDataFiles = function (folder, dataFiles) {
        var _this = this;
        return Promise.all(dataFiles.map(function (file) {
            return fs.readJSON(_this.dirs.sourceTemplates + "/" + folder + "/" + _this.dirs.dataPath + "/" + file)
                .then(function (data) { return fs.pathExists(_this.dirs.sourceTemplates + "/" + folder + "/" + _this.dirs.imagePath + "/" + file)
                .then(function (exists) { return __awaiter(_this, void 0, void 0, function () {
                var images;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!exists) return [3 /*break*/, 2];
                            return [4 /*yield*/, fs.readJSON(this.dirs.sourceTemplates + "/" + folder + "/" + this.dirs.imagePath + "/" + file)];
                        case 1:
                            images = _a.sent();
                            return [2 /*return*/, this.injectImagesIntoDataFile(images, data)];
                        case 2: return [2 /*return*/];
                    }
                });
            }); })
                .then(function () {
                var _a;
                var jsonKey = file.startsWith("_") ? file.substring(1, file.lastIndexOf(".")) : file.substring(0, file.lastIndexOf("."));
                return _a = {}, _a[jsonKey] = data, _a;
            }); });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.processRawItem = function (files, alternates) {
        var _this = this;
        return Promise.all(files.map(function (_a) {
            var src = _a.src, size = _a.size, dest = _a.dest;
            var srcName = src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
            var source = {
                size: size,
                name: (dest && dest.slice(dest.lastIndexOf("/") + 1).replace("[name]", srcName)) || srcName,
                extension: src.slice(src.lastIndexOf("."))
            };
            return alternates ?
                Promise.all(alternates.map(function (alter) { return _this.savePicture(_this.dirs.sourceImages + "/" + src, { src: _this.generateFileName(source, alter.dest), size: alter.size }); }))
                : _this.savePicture(_this.dirs.sourceImages + "/" + src, { src: _this.generateFileName(source, dest), size: size });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.injectImagesIntoDataFile = function (images, data) {
        var _this = this;
        return Promise.all(images.map(function (entry) { return entry.set ?
            Promise.all(entry.set.map(function (item, index) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.createPortionPictures(item).then(function (portion) {
                            return _this.index(data, entry.path.replace("[]", index.toString()), portion);
                        })];
                });
            }); })) :
            _this.createPortionPictures(entry).then(function (portion) {
                return _this.index(data, entry.path, portion);
            }); }));
    };
    ResponsiveJSONWebpackPlugin.prototype.createPortionPictures = function (entry) {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(entry.files.map(function (item, index) { return __awaiter(_this, void 0, void 0, function () {
                            var source, pictureSources, imgResolutions, img;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        source = this.parseSource(entry.files.length, index, item, entry.alt);
                                        return [4 /*yield*/, this.createPictureSources(source, entry.imageTemplate)];
                                    case 1:
                                        pictureSources = _a.sent();
                                        return [4 /*yield*/, this.createImgResolutions(source, entry.imageTemplate)];
                                    case 2:
                                        imgResolutions = _a.sent();
                                        return [4 /*yield*/, this.createImg(source, item.dest)];
                                    case 3:
                                        img = _a.sent();
                                        return [2 /*return*/, __assign({}, img, imgResolutions, { sources: pictureSources })];
                                }
                            });
                        }); }))];
                    case 1:
                        files = _a.sent();
                        return [2 /*return*/, files.length === 1 ? files[0] : files];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.createPictureSources = function (source, _a) {
        var _this = this;
        var sources = (_a === void 0 ? {} : _a).sources;
        if (sources) {
            return Promise.all(sources.map(function (pictureSourcesPartial) { return __awaiter(_this, void 0, void 0, function () {
                var pictureSource;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            pictureSource = {
                                media: pictureSourcesPartial.media,
                                sizes: pictureSourcesPartial.sizes,
                                srcset: pictureSourcesPartial.srcset.map(function (srcItem) { return ({
                                    file: srcItem.src,
                                    src: _this.generateFileName(source, srcItem.dest),
                                    size: srcItem.size
                                }); })
                            };
                            return [4 /*yield*/, Promise.all(pictureSource.srcset.map(function (srcItem) {
                                    var file = srcItem.file;
                                    delete srcItem.file;
                                    return _this.savePicture(_this.dirs.sourceImages + "/" + file, srcItem);
                                }))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, pictureSource];
                    }
                });
            }); }));
        }
        else
            return Promise.resolve();
    };
    ResponsiveJSONWebpackPlugin.prototype.createImgResolutions = function (source, _a) {
        var img = (_a === void 0 ? {} : _a).img;
        return __awaiter(this, void 0, void 0, function () {
            var imgResolutions;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!img) return [3 /*break*/, 2];
                        imgResolutions = {
                            sizes: img.sizes,
                            srcset: img.srcset.map(function (srcItem) { return ({
                                src: _this.generateFileName(source, srcItem.dest),
                                size: srcItem.size
                            }); })
                        };
                        return [4 /*yield*/, Promise.all(imgResolutions.srcset.map(function (srcItem) { return _this.savePicture(_this.dirs.sourceImages + "/" + source.src, srcItem); }))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, imgResolutions];
                    case 2: return [2 /*return*/, {}];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.createImg = function (source, dest) {
        return __awaiter(this, void 0, void 0, function () {
            var img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        img = {
                            src: this.generateFileName(source, dest),
                            size: source.size,
                            alt: source.alt
                        };
                        return [4 /*yield*/, this.savePicture(this.dirs.sourceImages + "/" + source.src, img)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, img];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.parseSource = function (filesLength, index, item, alt) {
        var srcName = item.src.slice(item.src.lastIndexOf("/") + 1, item.src.lastIndexOf("."));
        var entryIndex = filesLength > 1 ? index + 1 : 0;
        return {
            index: entryIndex,
            alt: alt && entryIndex ? alt + " " + entryIndex : alt,
            name: (item.dest && item.dest.slice(item.dest.lastIndexOf("/") + 1).replace("[name]", srcName)) || srcName,
            extension: item.src.slice(item.src.lastIndexOf(".")),
            src: item.src,
            size: item.size
        };
    };
    ResponsiveJSONWebpackPlugin.prototype.stripInvalid = function (str) {
        return str && typeof str === "string" ? str.replace(/[|&$%@"<>()+,]/g, "") : undefined;
    };
    ResponsiveJSONWebpackPlugin.prototype.generateFileName = function (_a, dest) {
        var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? "" : _c, _d = _b.index, index = _d === void 0 ? 0 : _d, _e = _b.size, size = _e === void 0 ? 0 : _e, _f = _b.extension, extension = _f === void 0 ? "" : _f;
        var filename = this.stripInvalid(dest ?
            dest
                .replace("[name]", name)
                .replace("[index]", index ? index : 1)
                .replace("[size]", size ? size : "")
            : name);
        if (!filename) {
            throw new Error("Invalid destination name.");
        }
        return this.dirs.outputFolder + "/" + this.dirs.imagePath + "/" + filename + extension;
    };
    ResponsiveJSONWebpackPlugin.prototype.index = function (obj, objPath, value) {
        if (typeof objPath == "string")
            return this.index(obj, objPath.split("."), value);
        else if (objPath.length == 1 && value !== undefined)
            return obj[objPath[0]] = value;
        else if (objPath.length == 0)
            return obj;
        else
            return this.index(obj[(isNaN(objPath[0]) ? objPath[0] : parseInt(objPath[0]))], objPath.slice(1), value);
    };
    ResponsiveJSONWebpackPlugin.prototype.getDependencies = function (dir, compilationDependenciesSet, rootdir, dependencies) {
        var _this = this;
        var list = fs.readdirSync(dir);
        list.forEach(function (file) {
            file = dir + "/" + file;
            var stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                _this.getDependencies(file, compilationDependenciesSet, rootdir, dependencies);
            }
            else {
                if (file.slice(file.lastIndexOf(".")) === ".json") {
                    dependencies.push(file);
                    compilationDependenciesSet.add(rootdir + "\\" + file.replace(_this.slashRegex, "\\"));
                }
            }
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.getChangedDependencies = function (compilation) {
        var _this = this;
        var folders = {};
        var files = {};
        var changedFolders = new Set();
        var changedPureFiles = [];
        var fileDependencies = [];
        compilation.contextDependencies.add(compilation.compiler.context + "\\" + this.dirs.sourceTemplates.replace(this.slashRegex, "\\"));
        this.getDependencies(this.dirs.sourceTemplates, compilation.fileDependencies, compilation.compiler.context, fileDependencies);
        fileDependencies.forEach(function (rawFileName) {
            var folderFile = rawFileName.slice(rawFileName.indexOf(_this.dirs.sourceTemplates) + _this.dirs.sourceTemplates.length + 1, rawFileName.lastIndexOf("/"));
            var folder = folderFile.slice(0, folderFile.indexOf("/"));
            var group = folderFile.slice(folderFile.indexOf("/") + 1);
            var time = fs.statSync(rawFileName).mtime.getTime();
            if ((group === _this.dirs.dataPath || group === _this.dirs.imagePath) && folder) {
                folders[folder] = folders[folder] ? folders[folder] : {
                    lastUpdate: [],
                    filenames: []
                };
                folders[folder].lastUpdate.push(time);
                folders[folder].filenames.push(rawFileName.slice(rawFileName.lastIndexOf(group)));
            }
            else {
                if (_this.files[rawFileName] !== time) {
                    changedPureFiles.push(rawFileName);
                }
                files[rawFileName] = time;
            }
        });
        for (var folder in folders) {
            folders[folder].lastUpdate = folders[folder].lastUpdate.sort().reverse()[0];
            if (!this.folders[folder] ||
                this.folders[folder].lastUpdate < folders[folder].lastUpdate ||
                this.folders[folder].filenames.length != folders[folder].filenames.length) {
                changedFolders.add(folder);
            }
        }
        return {
            folders: folders,
            files: files,
            changedFolders: Array.from(changedFolders),
            changedPureFiles: changedPureFiles
        };
    };
    return ResponsiveJSONWebpackPlugin;
}());
exports["default"] = ResponsiveJSONWebpackPlugin;
