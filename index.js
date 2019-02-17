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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var fs_extra_1 = __importDefault(require("fs-extra"));
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var ajv_1 = __importDefault(require("ajv"));
var raw_file_json_1 = __importDefault(require("./schemas/raw-file.json"));
var responsive_json_1 = __importDefault(require("./schemas/responsive.json"));
var ajv = new ajv_1["default"]();
var rawValidate = ajv.compile(raw_file_json_1["default"]);
var responsiveValidate = ajv.compile(responsive_json_1["default"]);
var ResponsiveJSONWebpackPlugin = /** @class */ (function () {
    function ResponsiveJSONWebpackPlugin(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.dataPath, dataPath = _c === void 0 ? "data" : _c, _d = _b.imagePath, imagePath = _d === void 0 ? "images" : _d, _e = _b.rawFolder, rawFolder = _e === void 0 ? "raw" : _e, _f = _b.sourceTemplates, sourceTemplates = _f === void 0 ? "src/assets/templates" : _f, _g = _b.sourceImages, sourceImages = _g === void 0 ? "src/assets/images" : _g, _h = _b.outputFolder, outputFolder = _h === void 0 ? "assets" : _h;
        this.slashRegex = new RegExp(/\\/, "g");
        this.establishedDependencies = {
            folders: {},
            files: {},
            direct: {}
        };
        this.dirs = {
            dataPath: dataPath,
            imagePath: imagePath,
            rawFolder: rawFolder,
            sourceTemplates: sourceTemplates,
            sourceImages: sourceImages,
            outputFolder: outputFolder
        };
        this.options = {
            sourceTemplates: sourceTemplates,
            sourceImages: sourceImages
        };
    }
    ResponsiveJSONWebpackPlugin.prototype.run = function (compilation) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.processedFileNames = [];
                        this.assets = compilation.assets;
                        this.dirs.sourceTemplates = path_1["default"]
                            .resolve(compilation.compiler.context, this.options.sourceTemplates)
                            .replace(this.slashRegex, "/");
                        this.dirs.sourceImages = path_1["default"]
                            .resolve(compilation.compiler.context, this.options.sourceImages)
                            .replace(this.slashRegex, "/");
                        this.establishedDependencies = this.getDependencies(compilation);
                        return [4 /*yield*/, this.processDataFolders(this.establishedDependencies.changedFolders)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.processRawFiles(this.establishedDependencies.changedPureFiles)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.processDirectFiles(this.establishedDependencies.changedDirectFiles)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.apply = function (compiler) {
        compiler.hooks.emit.tapPromise("ResponsiveJSONWebpackPlugin", this.run.bind(this));
    };
    ResponsiveJSONWebpackPlugin.prototype.logErrors = function (path, err) {
        console.error("ResponsiveJSONWebpackPlugin " + err + " --\"" + path + "\"");
    };
    ResponsiveJSONWebpackPlugin.prototype.saveJSON = function (folder, jsonMap) {
        var stringData = JSON.stringify(Object.assign.apply(Object, [{}].concat(jsonMap.filter(function (json) { return json; }))));
        if (stringData.length > 0) {
            this.assets["./" + this.dirs.outputFolder + "/" + this.dirs.dataPath + "/" + folder + ".json"] = {
                source: function () { return Buffer.from(stringData); },
                size: function () { return stringData.length; }
            };
        }
    };
    ResponsiveJSONWebpackPlugin.prototype.savePicture = function (sourceFilePath, _a) {
        var src = _a.src, size = _a.size;
        return __awaiter(this, void 0, void 0, function () {
            var _b, data_1, info_1, _c, err_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (!!this.processedFileNames.includes(src)) return [3 /*break*/, 7];
                        this.processedFileNames.push(src);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, , 7]);
                        if (!(typeof size === "number")) return [3 /*break*/, 3];
                        return [4 /*yield*/, sharp_1["default"](sourceFilePath)
                                .resize(size)
                                .toBuffer({ resolveWithObject: true })];
                    case 2:
                        _c = _d.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, sharp_1["default"](sourceFilePath)
                            .resize(null, null, size)
                            .toBuffer({ resolveWithObject: true })];
                    case 4:
                        _c = _d.sent();
                        _d.label = 5;
                    case 5:
                        _b = _c, data_1 = _b.data, info_1 = _b.info;
                        this.assets["./" + src] = {
                            source: function () { return data_1; },
                            size: function () { return info_1.size; }
                        };
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _d.sent();
                        this.processedFileNames.pop();
                        this.logErrors(sourceFilePath, err_1);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.processDirectFiles = function (dataFiles) {
        var _this = this;
        return Promise.all(dataFiles.map(function (file) {
            return fs_extra_1["default"]
                .readJSON(_this.dirs.sourceTemplates + "/" + _this.dirs.rawFolder + "/" + file + ".json")
                .then(function (data) { return _this.saveJSON(file, [data]); })["catch"](function (err) { return _this.logErrors(file, err); });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.processRawFiles = function (dataFiles) {
        var _this = this;
        return Promise.all(dataFiles.map(function (file) {
            return fs_extra_1["default"]
                .readJSON(file)
                .then(function (data) { return _this.validateRawFiles(data); })
                .then(function (data) {
                return Promise.all(data.map(function (raw) {
                    return Promise.all(raw.files.map(function (rawItem) {
                        return _this.processRawItem(file, rawItem, raw.alternates);
                    }));
                }));
            })["catch"](function (err) { return _this.logErrors(file, err); });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.validateRawFiles = function (data) {
        if (rawValidate(data)) {
            return data;
        }
        else {
            throw new Error(rawValidate.errors
                .map(function (err) { return "path '" + err.dataPath + "' " + err.message; })
                .join(", "));
        }
    };
    ResponsiveJSONWebpackPlugin.prototype.processRawItem = function (file, rawItem, alternates) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (typeof rawItem === "object") {
                    return [2 /*return*/, this.processRawItemObject(rawItem, alternates)];
                }
                else if (alternates) {
                    return [2 /*return*/, this.processRawItemString(rawItem, alternates)];
                }
                else {
                    this.logErrors(file, "Alternates must be used in string path only file sources.");
                }
                return [2 /*return*/];
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.processRawItemObject = function (rawItem, alternates) {
        return __awaiter(this, void 0, void 0, function () {
            var source;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        source = this.parseRawSource(rawItem);
                        if (!source.size) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.savePicture(this.dirs.sourceImages + "/" + rawItem.src, {
                                src: this.generateFileName(source, rawItem.dest),
                                size: rawItem.size
                            })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!alternates) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(alternates.map(function (alter) {
                                return _this.savePicture(_this.dirs.sourceImages + "/" + rawItem.src, {
                                    src: _this.generateFileName(source, alter.dest),
                                    size: alter.size
                                });
                            }))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.processRawItemString = function (rawItem, alternates) {
        var _this = this;
        var source = {
            name: rawItem.slice(0, rawItem.lastIndexOf(".")),
            extension: rawItem.slice(rawItem.lastIndexOf("."))
        };
        return Promise.all(alternates.map(function (alter) {
            return _this.savePicture(_this.dirs.sourceImages + "/" + rawItem, {
                src: _this.generateFileName(source, alter.dest),
                size: alter.size
            });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.processDataFolders = function (dataFolders) {
        var _this = this;
        return Promise.all(dataFolders.map(function (folder) {
            return _this.processDataFiles(folder).then(function (jsonMap) {
                return _this.saveJSON(folder, jsonMap);
            });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.processDataFiles = function (folder) {
        var _this = this;
        var dataFiles = this.establishedDependencies.folders[folder].filenames.filter(function (name) { return name.startsWith(_this.dirs.dataPath); });
        return Promise.all(dataFiles.map(function (file) {
            return fs_extra_1["default"]
                .readJSON(_this.dirs.sourceTemplates + "/" + folder + "/" + file)
                .then(function (data) { return _this.checkImageFile(folder, file, data); })
                .then(function (data) {
                var _a;
                var fileKey = file.replace(_this.dirs.dataPath + "/", "");
                var jsonKey = fileKey.startsWith("_")
                    ? fileKey.substring(1, fileKey.lastIndexOf("."))
                    : fileKey.substring(0, fileKey.lastIndexOf("."));
                return _a = {}, _a[jsonKey] = data, _a;
            })["catch"](function (err) { return _this.logErrors(file, err); });
        }));
    };
    ResponsiveJSONWebpackPlugin.prototype.checkImageFile = function (folder, file, data) {
        return __awaiter(this, void 0, void 0, function () {
            var imageFile, images, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imageFile = file.replace(this.dirs.dataPath, this.dirs.imagePath);
                        if (!this.establishedDependencies.folders[folder].filenames.includes(imageFile)) return [3 /*break*/, 7];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, fs_extra_1["default"].readJSON(this.dirs.sourceTemplates + "/" + folder + "/" + imageFile)];
                    case 2:
                        images = _a.sent();
                        if (!responsiveValidate(images)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.injectImagesIntoDataFile(images, data)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw new Error(responsiveValidate.errors
                        .map(function (err) { return "path '" + err.dataPath + "' " + err.message; })
                        .join(", "));
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_2 = _a.sent();
                        this.logErrors(file, err_2);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, data];
                }
            });
        });
    };
    ResponsiveJSONWebpackPlugin.prototype.injectImagesIntoDataFile = function (images, data) {
        var _this = this;
        return Promise.all(images.map(function (entry) {
            return entry.set
                ? Promise.all(entry.set.map(function (item, index) {
                    return _this.createPortionPictures(item).then(function (portion) {
                        return _this.index(data, entry.path.replace("[]", index.toString()), portion);
                    });
                }))
                : _this.createPortionPictures(entry).then(function (portion) {
                    return _this.index(data, entry.path, portion);
                });
        }));
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
                                    dest: srcItem.src,
                                    src: _this.generateFileName(source, srcItem.dest),
                                    size: srcItem.size
                                }); })
                            };
                            return [4 /*yield*/, Promise.all(pictureSource.srcset.map(function (srcItem) {
                                    var file = srcItem.dest;
                                    delete srcItem.dest;
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
                        return [4 /*yield*/, Promise.all(imgResolutions.srcset.map(function (srcItem) {
                                return _this.savePicture(_this.dirs.sourceImages + "/" + source.src, srcItem);
                            }))];
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
        var srcName = item.src.slice(this.getLastSlash(item.src) + 1, item.src.lastIndexOf("."));
        var entryIndex = filesLength > 1 ? index + 1 : 0;
        return {
            index: entryIndex,
            alt: alt && entryIndex ? alt + " " + entryIndex : alt,
            name: (item.dest &&
                item.dest
                    .slice(this.getLastSlash(item.dest) + 1)
                    .replace("[name]", srcName)) ||
                srcName,
            extension: item.src.slice(item.src.lastIndexOf(".")),
            src: item.src,
            size: item.size
        };
    };
    ResponsiveJSONWebpackPlugin.prototype.parseRawSource = function (_a) {
        var size = _a.size, src = _a.src, dest = _a.dest;
        var srcName = src.slice(this.getLastSlash(src) + 1, src.lastIndexOf("."));
        return {
            size: size,
            src: src,
            name: (dest &&
                dest.slice(this.getLastSlash(dest) + 1).replace("[name]", srcName)) ||
                srcName,
            extension: src.slice(src.lastIndexOf("."))
        };
    };
    ResponsiveJSONWebpackPlugin.prototype.getFirstSlash = function (str) {
        var win = str.indexOf("\\");
        var oth = str.indexOf("/");
        return (win < 0 && oth < 0) || win < 0 ? oth : win;
    };
    ResponsiveJSONWebpackPlugin.prototype.getLastSlash = function (str) {
        return Math.max(str.lastIndexOf("\\"), str.lastIndexOf("/"));
    };
    ResponsiveJSONWebpackPlugin.prototype.stripInvalid = function (str) {
        return str && typeof str === "string"
            ? str.replace(/[|&$%"<>()+,]/g, "")
            : undefined;
    };
    ResponsiveJSONWebpackPlugin.prototype.generateFileName = function (_a, dest) {
        var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? "" : _c, _d = _b.index, index = _d === void 0 ? 0 : _d, _e = _b.size, size = _e === void 0 ? 0 : _e, _f = _b.extension, extension = _f === void 0 ? "" : _f;
        var filename = this.stripInvalid(dest
            ? dest
                .replace("[name]", name)
                .replace("[index]", (index ? index : 1).toString())
                .replace("[size]", size && typeof size === "number"
                ? size.toString()
                : size && typeof size === "object" && size.width
                    ? size.width.toString()
                    : "")
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
            return (obj[objPath[0]] = value);
        else if (objPath.length == 0)
            return obj;
        else
            return this.index(obj[isNaN(objPath[0]) ? objPath[0] : parseInt(objPath[0])], objPath.slice(1), value);
    };
    ResponsiveJSONWebpackPlugin.prototype.getDependencies = function (_a) {
        var contextDependencies = _a.contextDependencies, fileDependencies = _a.fileDependencies, compiler = _a.compiler;
        var _b = this.readFolderDependencies(this.dirs.sourceTemplates, compiler.context), localFileDependencies = _b.fileDependencies, localContextDependencies = _b.contextDependencies;
        for (var _i = 0, localFileDependencies_1 = localFileDependencies; _i < localFileDependencies_1.length; _i++) {
            var file = localFileDependencies_1[_i];
            fileDependencies.add(path_1["default"].resolve(file));
        }
        for (var _c = 0, localContextDependencies_1 = localContextDependencies; _c < localContextDependencies_1.length; _c++) {
            var folder = localContextDependencies_1[_c];
            contextDependencies.add(path_1["default"].resolve(folder));
        }
        return __assign({ fileDependencies: localFileDependencies, contextDependencies: localContextDependencies }, this.getChangedDependencies(localFileDependencies));
    };
    //recursive
    ResponsiveJSONWebpackPlugin.prototype.readFolderDependencies = function (dir, context, fileDependencies, contextDependencies) {
        var _this = this;
        if (fileDependencies === void 0) { fileDependencies = []; }
        if (contextDependencies === void 0) { contextDependencies = []; }
        contextDependencies.push(path_1["default"].resolve(context, dir).replace(this.slashRegex, "/"));
        var list = fs_extra_1["default"].readdirSync(dir);
        list.forEach(function (file) {
            file = dir + "/" + file;
            var stat = fs_extra_1["default"].statSync(file);
            if (stat && stat.isDirectory()) {
                _this.readFolderDependencies(file, context, fileDependencies, contextDependencies);
            }
            else if (file.slice(file.lastIndexOf(".")) === ".json") {
                fileDependencies.push(path_1["default"].resolve(context, file).replace(_this.slashRegex, "/"));
            }
        });
        return { fileDependencies: fileDependencies, contextDependencies: contextDependencies };
    };
    ResponsiveJSONWebpackPlugin.prototype.getChangedDependencies = function (fileDependencies) {
        var _this = this;
        var folders = {};
        var files = {};
        var direct = {};
        var changedFolders = new Set();
        var changedPureFiles = [];
        var changedDirectFiles = [];
        fileDependencies.forEach(function (rawFileName) {
            var folderFile = rawFileName.slice(rawFileName.indexOf(_this.dirs.sourceTemplates) +
                _this.dirs.sourceTemplates.length +
                1, _this.getLastSlash(rawFileName));
            var folder = folderFile.slice(0, _this.getFirstSlash(folderFile));
            var group = folderFile.slice(_this.getFirstSlash(folderFile) + 1);
            var fileName = rawFileName.slice(_this.getLastSlash(rawFileName) + 1, rawFileName.lastIndexOf("."));
            var time = fs_extra_1["default"].statSync(rawFileName).mtime.getTime();
            if (folderFile === _this.dirs.rawFolder &&
                _this.getFirstSlash(folderFile) < 0 //no nested folders
            ) {
                if (_this.establishedDependencies.direct[rawFileName] !== time) {
                    changedDirectFiles.push(fileName);
                }
                direct[rawFileName] = time;
            }
            else if ((group === _this.dirs.dataPath || group === _this.dirs.imagePath) &&
                _this.getFirstSlash(folderFile) > 0 //no images/data folder by itself
            ) {
                folders[folder] = folders[folder]
                    ? folders[folder]
                    : {
                        lastUpdate: [],
                        filenames: []
                    };
                folders[folder].lastUpdate.push(time);
                folders[folder].filenames.push(rawFileName.slice(rawFileName.lastIndexOf(group)));
            }
            else {
                if (_this.establishedDependencies.files[rawFileName] !== time) {
                    changedPureFiles.push(rawFileName);
                }
                files[rawFileName] = time;
            }
        });
        for (var folder in folders) {
            folders[folder].lastUpdate = folders[folder].lastUpdate
                .sort()
                .reverse()[0]; //most recent update across all files in folder
            if (!this.establishedDependencies.folders[folder] ||
                this.establishedDependencies.folders[folder].lastUpdate <
                    folders[folder].lastUpdate ||
                this.establishedDependencies.folders[folder].filenames.length !=
                    folders[folder].filenames.length) {
                changedFolders.add(folder);
            }
        }
        return {
            folders: folders,
            files: files,
            direct: direct,
            changedFolders: Array.from(changedFolders),
            changedPureFiles: changedPureFiles,
            changedDirectFiles: changedDirectFiles
        };
    };
    return ResponsiveJSONWebpackPlugin;
}());
module.exports = ResponsiveJSONWebpackPlugin;
