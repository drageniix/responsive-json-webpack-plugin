!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}([function(t,e){t.exports=require("fs-extra")},function(t,e){t.exports=require("sharp")},function(t,e,r){t.exports=r(3)},function(t,e,r){"use strict";r.r(e),function(t){r.d(e,"default",function(){return l});var n=r(0),i=r(1),o=r.n(i);function s(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"==typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable}))),n.forEach(function(e){a(t,e,r[e])})}return t}function a(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function u(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function f(t,e,r,n,i,o,s){try{var a=t[o](s),u=a.value}catch(t){return void r(t)}a.done?e(u):Promise.resolve(u).then(n,i)}function c(t){return function(){var e=this,r=arguments;return new Promise(function(n,i){var o=t.apply(e,r);function s(t){f(o,n,i,s,a,"next",t)}function a(t){f(o,n,i,s,a,"throw",t)}s(void 0)})}}function h(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var l=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.dataPath,n=void 0===r?"data":r,i=t.imagePath,o=void 0===i?"images":i,s=t.sourceTemplates,a=void 0===s?"src/assets/templates":s,u=t.sourceImages,f=void 0===u?"src/assets/images":u,c=t.outputFolder,h=void 0===c?"assets":c;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.folders={},this.files={},this.slashRegex=new RegExp("/","g"),this.stripRegex=/^\/+|^\.\/+|\/+$/g,this.dirs={dataPath:n.replace(this.stripRegex,""),imagePath:o.replace(this.stripRegex,""),sourceTemplates:a.replace(this.stripRegex,""),sourceImages:f.replace(this.stripRegex,""),outputFolder:h.replace(this.stripRegex,"")}}return function(t,e,r){e&&h(t.prototype,e),r&&h(t,r)}(e,[{key:"run",value:function(){var t=c(regeneratorRuntime.mark(function t(e){var r;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r=this.getChangedDependencies(e),this.processedFileNames=[],this.assets=e.assets,this.folders=r.folders,this.files=r.files,t.next=7,this.processDataFolders(r.changedFolders);case 7:return t.next=9,this.processRawFiles(r.changedPureFiles);case 9:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"apply",value:function(t){t.hooks.emit.tapPromise("ResponsiveJSONPlugin",this.run.bind(this))}},{key:"saveJSON",value:function(e,r){var n=JSON.stringify(Object.assign.apply(Object,[{}].concat(u(r))));this.assets["./".concat(this.dirs.outputFolder,"/").concat(this.dirs.dataPath,"/").concat(e,".json")]={source:function(){return t.from(n)},size:function(){return n.length}}}},{key:"savePicture",value:function(){var t=c(regeneratorRuntime.mark(function t(e,r){var n,i,s,a,u;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(n=r.src,i=r.size,this.processedFileNames.includes(n)){t.next=9;break}return this.processedFileNames.push(n),t.next=5,o()(e).resize(i).toBuffer({resolveWithObject:!0});case 5:s=t.sent,a=s.data,u=s.info,this.assets["./".concat(n)]={source:function(){return a},size:function(){return u.size}};case 9:case"end":return t.stop()}},t,this)}));return function(e,r){return t.apply(this,arguments)}}()},{key:"processRawFiles",value:function(t){var e=this;return Promise.all(t.map(function(t){return Object(n.readJSON)(t).then(function(t){return Promise.all(t.map(function(t){var r=t.files,n=t.alternates;return e.processRawItem(r,n)}))})}))}},{key:"processDataFolders",value:function(t){var e=this;return Promise.all(t.map(function(t){return Object(n.readdir)("".concat(e.dirs.sourceTemplates,"/").concat(t,"/").concat(e.dirs.dataPath)).then(function(r){return e.processDataFiles(t,r)}).then(function(r){return e.saveJSON(t,r)})}))}},{key:"processDataFiles",value:function(t,e){var r=this;return Promise.all(e.map(function(e){return Object(n.readJSON)("".concat(r.dirs.sourceTemplates,"/").concat(t,"/").concat(r.dirs.dataPath,"/").concat(e)).then(function(i){return Object(n.exists)("".concat(r.dirs.sourceTemplates,"/").concat(t,"/").concat(r.dirs.imagePath,"/").concat(e)).then(function(o){if(o)return Object(n.readJSON)("".concat(r.dirs.sourceTemplates,"/").concat(t,"/").concat(r.dirs.imagePath,"/").concat(e)).then(function(t){return r.injectImagesIntoDataFile(t,i)})}).then(function(){return a({},e.startsWith("_")?e.substring(1,e.lastIndexOf(".")):e.substring(0,e.lastIndexOf(".")),i)})})}))}},{key:"processRawItem",value:function(t,e){var r=this;return Promise.all(t.map(function(t){var n=t.src,i=t.size,o=t.dest,s=n.slice(n.lastIndexOf("/")+1,n.lastIndexOf(".")),a={size:i,name:o&&o.slice(o.lastIndexOf("/")+1).replace("[name]",s)||s,extension:n.slice(n.lastIndexOf("."))};return e?Promise.all(e.map(function(t){return r.savePicture("".concat(r.dirs.sourceImages,"/").concat(n),{src:r.generateFileName(a,t.dest),size:t.size},a.extension)})):r.savePicture("".concat(r.dirs.sourceImages,"/").concat(n),{src:r.generateFileName(a,o),size:i},a.extension)}))}},{key:"injectImagesIntoDataFile",value:function(t,e){var r=this;return Promise.all(t.map(function(t){return t.set?Promise.all(t.set.map(function(){var n=c(regeneratorRuntime.mark(function n(i,o){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",r.createPortionPictures(i).then(function(n){return r.index(e,t.path.replace("[]",o),n)}));case 1:case"end":return n.stop()}},n,this)}));return function(t,e){return n.apply(this,arguments)}}())):r.createPortionPictures(t).then(function(n){return r.index(e,t.path,n)})}))}},{key:"createPortionPictures",value:function(){var t=c(regeneratorRuntime.mark(function t(e){var r,n=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(e.files.map(function(){var t=c(regeneratorRuntime.mark(function t(r,i){var o,a,u,f;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=n.parseSource(e.files.length,e.alt,i,r),t.next=3,n.createPictureSources(o,e.imageTemplate);case 3:return a=t.sent,t.next=6,n.createImgResolutions(o,e.imageTemplate);case 6:return u=t.sent,t.next=9,n.createImg(o,r.dest);case 9:return f=t.sent,t.abrupt("return",Promise.resolve(s({},f,u,{sources:a})));case 11:case"end":return t.stop()}},t,this)}));return function(e,r){return t.apply(this,arguments)}}()));case 2:return r=t.sent,t.abrupt("return",1===r.length?r[0]:r);case 4:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"createPictureSources",value:function(t){var e=this,r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).sources;return r?Promise.all(r.map(function(){var r=c(regeneratorRuntime.mark(function r(n){var i;return regeneratorRuntime.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return i={media:n.media,sizes:n.sizes,srcset:n.srcset.map(function(r){return{file:r.src,src:e.generateFileName(t,r.dest),size:r.size}})},r.next=3,Promise.all(i.srcset.map(function(r){var n=r.file;return delete r.file,e.savePicture("".concat(e.dirs.sourceImages,"/").concat(n),r,t.extension)}));case 3:return r.abrupt("return",i);case 4:case"end":return r.stop()}},r,this)}));return function(t){return r.apply(this,arguments)}}())):Promise.resolve()}},{key:"createImgResolutions",value:function(){var t=c(regeneratorRuntime.mark(function t(e){var r,n,i,o=this,s=arguments;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r=s.length>1&&void 0!==s[1]?s[1]:{},!(n=r.img)){t.next=6;break}return i={sizes:n.sizes,srcset:n.srcset.map(function(t){return{src:o.generateFileName(e,t.dest),size:t.size}})},t.next=5,Promise.all(i.srcset.map(function(t){return o.savePicture("".concat(o.dirs.sourceImages,"/").concat(e.src),t,e.extension)}));case 5:return t.abrupt("return",i);case 6:return t.abrupt("return",{});case 7:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"createImg",value:function(){var t=c(regeneratorRuntime.mark(function t(e,r){var n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n={src:this.generateFileName(e,r),size:e.size,alt:e.alt},t.next=3,this.savePicture("".concat(this.dirs.sourceImages,"/").concat(e.src),n,e.extension);case 3:return t.abrupt("return",n);case 4:case"end":return t.stop()}},t,this)}));return function(e,r){return t.apply(this,arguments)}}()},{key:"parseSource",value:function(t,e,r,n){var i=n.src.slice(n.src.lastIndexOf("/")+1,n.src.lastIndexOf(".")),o=t>1?r+1:0;return{index:o,alt:e&&o?e+" "+o:e,name:n.dest&&n.dest.slice(n.dest.lastIndexOf("/")+1).replace("[name]",i)||i,extension:n.src.slice(n.src.lastIndexOf(".")),src:n.src,size:n.size}}},{key:"stripInvalid",value:function(t){return t&&"string"==typeof t?t.replace(/[|&$%@"<>()+,]/g,""):void 0}},{key:"generateFileName",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.name,r=t.index,n=t.size,i=t.extension,o=arguments.length>1?arguments[1]:void 0,s=this.stripInvalid(o?o.replace("[name]",e).replace("[index]",r||1).replace("[size]",n||""):e);if(!s)throw new Error("Invalid destination name.");return"".concat(this.dirs.outputFolder,"/").concat(this.dirs.imagePath,"/").concat(s).concat(i)}},{key:"index",value:function(t,e,r){return"string"==typeof e?this.index(t,e.split("."),r):1==e.length&&void 0!==r?t[e[0]]=r:0==e.length?t:this.index(t[isNaN(e[0])?e[0]:parseInt(e[0])],e.slice(1),r)}},{key:"getDependencies",value:function(t,e,r,i){var o=this;Object(n.readdirSync)(t).forEach(function(s){s=t+"/"+s;var a=Object(n.statSync)(s);a&&a.isDirectory()?o.getDependencies(s,e,r,i):".json"===s.slice(s.lastIndexOf("."))&&(i.push(s),e.add(r+"\\"+s.replace(o.slashRegex,"\\")))})}},{key:"getChangedDependencies",value:function(t){var e=this,r={},i={},o=new Set,s=[],a=[];for(var u in t.contextDependencies.add(t.compiler.context+"\\"+this.dirs.sourceTemplates.replace(this.slashRegex,"\\")),this.getDependencies(this.dirs.sourceTemplates,t.fileDependencies,t.compiler.context,a),a.forEach(function(t){var o=t.slice(t.indexOf(e.dirs.sourceTemplates)+e.dirs.sourceTemplates.length+1,t.lastIndexOf("/")),a=o.slice(0,o.indexOf("/")),u=o.slice(o.indexOf("/")+1),f=Object(n.statSync)(t).mtime.getTime();u!==e.dirs.dataPath&&u!==e.dirs.imagePath||!a?(e.files[t]!==f&&s.push(t),i[t]=f):(r[a]=r[a]?r[a]:{lastUpdate:[],filenames:[]},r[a].lastUpdate.push(f),r[a].filenames.push(t.slice(t.lastIndexOf(u))))}),r)r[u].lastUpdate=r[u].lastUpdate.sort().reverse()[0],(!this.folders[u]||this.folders[u].lastUpdate<r[u].lastUpdate||this.folders[u].filenames.length!=r[u].filenames.length)&&o.add(u);return{folders:r,files:i,changedFolders:Array.from(o),changedPureFiles:s}}}]),e}()}.call(this,r(4).Buffer)},function(t,e,r){"use strict";(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var n=r(6),i=r(7),o=r(8);function s(){return u.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function a(t,e){if(s()<e)throw new RangeError("Invalid typed array length");return u.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=u.prototype:(null===t&&(t=new u(e)),t.length=e),t}function u(t,e,r){if(!(u.TYPED_ARRAY_SUPPORT||this instanceof u))return new u(t,e,r);if("number"==typeof t){if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return h(this,t)}return f(this,t,e,r)}function f(t,e,r,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function(t,e,r,n){if(e.byteLength,r<0||e.byteLength<r)throw new RangeError("'offset' is out of bounds");if(e.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");e=void 0===r&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,r):new Uint8Array(e,r,n);u.TYPED_ARRAY_SUPPORT?(t=e).__proto__=u.prototype:t=l(t,e);return t}(t,e,r,n):"string"==typeof e?function(t,e,r){"string"==typeof r&&""!==r||(r="utf8");if(!u.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|g(e,r),i=(t=a(t,n)).write(e,r);i!==n&&(t=t.slice(0,i));return t}(t,e,r):function(t,e){if(u.isBuffer(e)){var r=0|p(e.length);return 0===(t=a(t,r)).length?t:(e.copy(t,0,0,r),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||function(t){return t!=t}(e.length)?a(t,0):l(t,e);if("Buffer"===e.type&&o(e.data))return l(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function c(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function h(t,e){if(c(e),t=a(t,e<0?0:0|p(e)),!u.TYPED_ARRAY_SUPPORT)for(var r=0;r<e;++r)t[r]=0;return t}function l(t,e){var r=e.length<0?0:0|p(e.length);t=a(t,r);for(var n=0;n<r;n+=1)t[n]=255&e[n];return t}function p(t){if(t>=s())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s().toString(16)+" bytes");return 0|t}function g(t,e){if(u.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var r=t.length;if(0===r)return 0;for(var n=!1;;)switch(e){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return N(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return C(t).length;default:if(n)return N(t).length;e=(""+e).toLowerCase(),n=!0}}function d(t,e,r){var n=t[e];t[e]=t[r],t[r]=n}function y(t,e,r,n,i){if(0===t.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:t.length-1),r<0&&(r=t.length+r),r>=t.length){if(i)return-1;r=t.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof e&&(e=u.from(e,n)),u.isBuffer(e))return 0===e.length?-1:v(t,e,r,n,i);if("number"==typeof e)return e&=255,u.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,r):Uint8Array.prototype.lastIndexOf.call(t,e,r):v(t,[e],r,n,i);throw new TypeError("val must be string, number or Buffer")}function v(t,e,r,n,i){var o,s=1,a=t.length,u=e.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(t.length<2||e.length<2)return-1;s=2,a/=2,u/=2,r/=2}function f(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){var c=-1;for(o=r;o<a;o++)if(f(t,o)===f(e,-1===c?0:o-c)){if(-1===c&&(c=o),o-c+1===u)return c*s}else-1!==c&&(o-=o-c),c=-1}else for(r+u>a&&(r=a-u),o=r;o>=0;o--){for(var h=!0,l=0;l<u;l++)if(f(t,o+l)!==f(e,l)){h=!1;break}if(h)return o}return-1}function m(t,e,r,n){r=Number(r)||0;var i=t.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=e.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var s=0;s<n;++s){var a=parseInt(e.substr(2*s,2),16);if(isNaN(a))return s;t[r+s]=a}return s}function w(t,e,r,n){return M(N(e,t.length-r),t,r,n)}function b(t,e,r,n){return M(function(t){for(var e=[],r=0;r<t.length;++r)e.push(255&t.charCodeAt(r));return e}(e),t,r,n)}function P(t,e,r,n){return b(t,e,r,n)}function R(t,e,r,n){return M(C(e),t,r,n)}function E(t,e,r,n){return M(function(t,e){for(var r,n,i,o=[],s=0;s<t.length&&!((e-=2)<0);++s)r=t.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(e,t.length-r),t,r,n)}function x(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function _(t,e,r){r=Math.min(t.length,r);for(var n=[],i=e;i<r;){var o,s,a,u,f=t[i],c=null,h=f>239?4:f>223?3:f>191?2:1;if(i+h<=r)switch(h){case 1:f<128&&(c=f);break;case 2:128==(192&(o=t[i+1]))&&(u=(31&f)<<6|63&o)>127&&(c=u);break;case 3:o=t[i+1],s=t[i+2],128==(192&o)&&128==(192&s)&&(u=(15&f)<<12|(63&o)<<6|63&s)>2047&&(u<55296||u>57343)&&(c=u);break;case 4:o=t[i+1],s=t[i+2],a=t[i+3],128==(192&o)&&128==(192&s)&&128==(192&a)&&(u=(15&f)<<18|(63&o)<<12|(63&s)<<6|63&a)>65535&&u<1114112&&(c=u)}null===c?(c=65533,h=1):c>65535&&(c-=65536,n.push(c>>>10&1023|55296),c=56320|1023&c),n.push(c),i+=h}return function(t){var e=t.length;if(e<=A)return String.fromCharCode.apply(String,t);var r="",n=0;for(;n<e;)r+=String.fromCharCode.apply(String,t.slice(n,n+=A));return r}(n)}e.Buffer=u,e.SlowBuffer=function(t){+t!=t&&(t=0);return u.alloc(+t)},e.INSPECT_MAX_BYTES=50,u.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),e.kMaxLength=s(),u.poolSize=8192,u._augment=function(t){return t.__proto__=u.prototype,t},u.from=function(t,e,r){return f(null,t,e,r)},u.TYPED_ARRAY_SUPPORT&&(u.prototype.__proto__=Uint8Array.prototype,u.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&u[Symbol.species]===u&&Object.defineProperty(u,Symbol.species,{value:null,configurable:!0})),u.alloc=function(t,e,r){return function(t,e,r,n){return c(e),e<=0?a(t,e):void 0!==r?"string"==typeof n?a(t,e).fill(r,n):a(t,e).fill(r):a(t,e)}(null,t,e,r)},u.allocUnsafe=function(t){return h(null,t)},u.allocUnsafeSlow=function(t){return h(null,t)},u.isBuffer=function(t){return!(null==t||!t._isBuffer)},u.compare=function(t,e){if(!u.isBuffer(t)||!u.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var r=t.length,n=e.length,i=0,o=Math.min(r,n);i<o;++i)if(t[i]!==e[i]){r=t[i],n=e[i];break}return r<n?-1:n<r?1:0},u.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(t,e){if(!o(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u.alloc(0);var r;if(void 0===e)for(e=0,r=0;r<t.length;++r)e+=t[r].length;var n=u.allocUnsafe(e),i=0;for(r=0;r<t.length;++r){var s=t[r];if(!u.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},u.byteLength=g,u.prototype._isBuffer=!0,u.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)d(this,e,e+1);return this},u.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)d(this,e,e+3),d(this,e+1,e+2);return this},u.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)d(this,e,e+7),d(this,e+1,e+6),d(this,e+2,e+5),d(this,e+3,e+4);return this},u.prototype.toString=function(){var t=0|this.length;return 0===t?"":0===arguments.length?_(this,0,t):function(t,e,r){var n=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return I(this,e,r);case"utf8":case"utf-8":return _(this,e,r);case"ascii":return O(this,e,r);case"latin1":case"binary":return T(this,e,r);case"base64":return x(this,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return S(this,e,r);default:if(n)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),n=!0}}.apply(this,arguments)},u.prototype.equals=function(t){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u.compare(this,t)},u.prototype.inspect=function(){var t="",r=e.INSPECT_MAX_BYTES;return this.length>0&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},u.prototype.compare=function(t,e,r,n,i){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===r&&(r=t?t.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),e<0||r>t.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&e>=r)return 0;if(n>=i)return-1;if(e>=r)return 1;if(e>>>=0,r>>>=0,n>>>=0,i>>>=0,this===t)return 0;for(var o=i-n,s=r-e,a=Math.min(o,s),f=this.slice(n,i),c=t.slice(e,r),h=0;h<a;++h)if(f[h]!==c[h]){o=f[h],s=c[h];break}return o<s?-1:s<o?1:0},u.prototype.includes=function(t,e,r){return-1!==this.indexOf(t,e,r)},u.prototype.indexOf=function(t,e,r){return y(this,t,e,r,!0)},u.prototype.lastIndexOf=function(t,e,r){return y(this,t,e,r,!1)},u.prototype.write=function(t,e,r,n){if(void 0===e)n="utf8",r=this.length,e=0;else if(void 0===r&&"string"==typeof e)n=e,r=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-e;if((void 0===r||r>i)&&(r=i),t.length>0&&(r<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return m(this,t,e,r);case"utf8":case"utf-8":return w(this,t,e,r);case"ascii":return b(this,t,e,r);case"latin1":case"binary":return P(this,t,e,r);case"base64":return R(this,t,e,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,e,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var A=4096;function O(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(127&t[i]);return n}function T(t,e,r){var n="";r=Math.min(t.length,r);for(var i=e;i<r;++i)n+=String.fromCharCode(t[i]);return n}function I(t,e,r){var n=t.length;(!e||e<0)&&(e=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=e;o<r;++o)i+=L(t[o]);return i}function S(t,e,r){for(var n=t.slice(e,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function B(t,e,r){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>r)throw new RangeError("Trying to access beyond buffer length")}function U(t,e,r,n,i,o){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(r+n>t.length)throw new RangeError("Index out of range")}function k(t,e,r,n){e<0&&(e=65535+e+1);for(var i=0,o=Math.min(t.length-r,2);i<o;++i)t[r+i]=(e&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function Y(t,e,r,n){e<0&&(e=4294967295+e+1);for(var i=0,o=Math.min(t.length-r,4);i<o;++i)t[r+i]=e>>>8*(n?i:3-i)&255}function D(t,e,r,n,i,o){if(r+n>t.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function j(t,e,r,n,o){return o||D(t,0,r,4),i.write(t,e,r,n,23,4),r+4}function F(t,e,r,n,o){return o||D(t,0,r,8),i.write(t,e,r,n,52,8),r+8}u.prototype.slice=function(t,e){var r,n=this.length;if(t=~~t,e=void 0===e?n:~~e,t<0?(t+=n)<0&&(t=0):t>n&&(t=n),e<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t),u.TYPED_ARRAY_SUPPORT)(r=this.subarray(t,e)).__proto__=u.prototype;else{var i=e-t;r=new u(i,void 0);for(var o=0;o<i;++o)r[o]=this[o+t]}return r},u.prototype.readUIntLE=function(t,e,r){t|=0,e|=0,r||B(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n},u.prototype.readUIntBE=function(t,e,r){t|=0,e|=0,r||B(t,e,this.length);for(var n=this[t+--e],i=1;e>0&&(i*=256);)n+=this[t+--e]*i;return n},u.prototype.readUInt8=function(t,e){return e||B(t,1,this.length),this[t]},u.prototype.readUInt16LE=function(t,e){return e||B(t,2,this.length),this[t]|this[t+1]<<8},u.prototype.readUInt16BE=function(t,e){return e||B(t,2,this.length),this[t]<<8|this[t+1]},u.prototype.readUInt32LE=function(t,e){return e||B(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u.prototype.readUInt32BE=function(t,e){return e||B(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u.prototype.readIntLE=function(t,e,r){t|=0,e|=0,r||B(t,e,this.length);for(var n=this[t],i=1,o=0;++o<e&&(i*=256);)n+=this[t+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*e)),n},u.prototype.readIntBE=function(t,e,r){t|=0,e|=0,r||B(t,e,this.length);for(var n=e,i=1,o=this[t+--n];n>0&&(i*=256);)o+=this[t+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*e)),o},u.prototype.readInt8=function(t,e){return e||B(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u.prototype.readInt16LE=function(t,e){e||B(t,2,this.length);var r=this[t]|this[t+1]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt16BE=function(t,e){e||B(t,2,this.length);var r=this[t+1]|this[t]<<8;return 32768&r?4294901760|r:r},u.prototype.readInt32LE=function(t,e){return e||B(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u.prototype.readInt32BE=function(t,e){return e||B(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u.prototype.readFloatLE=function(t,e){return e||B(t,4,this.length),i.read(this,t,!0,23,4)},u.prototype.readFloatBE=function(t,e){return e||B(t,4,this.length),i.read(this,t,!1,23,4)},u.prototype.readDoubleLE=function(t,e){return e||B(t,8,this.length),i.read(this,t,!0,52,8)},u.prototype.readDoubleBE=function(t,e){return e||B(t,8,this.length),i.read(this,t,!1,52,8)},u.prototype.writeUIntLE=function(t,e,r,n){(t=+t,e|=0,r|=0,n)||U(this,t,e,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[e]=255&t;++o<r&&(i*=256);)this[e+o]=t/i&255;return e+r},u.prototype.writeUIntBE=function(t,e,r,n){(t=+t,e|=0,r|=0,n)||U(this,t,e,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+r},u.prototype.writeUInt8=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,1,255,0),u.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},u.prototype.writeUInt16LE=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):k(this,t,e,!0),e+2},u.prototype.writeUInt16BE=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,2,65535,0),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):k(this,t,e,!1),e+2},u.prototype.writeUInt32LE=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):Y(this,t,e,!0),e+4},u.prototype.writeUInt32BE=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,4,4294967295,0),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):Y(this,t,e,!1),e+4},u.prototype.writeIntLE=function(t,e,r,n){if(t=+t,e|=0,!n){var i=Math.pow(2,8*r-1);U(this,t,e,r,i-1,-i)}var o=0,s=1,a=0;for(this[e]=255&t;++o<r&&(s*=256);)t<0&&0===a&&0!==this[e+o-1]&&(a=1),this[e+o]=(t/s>>0)-a&255;return e+r},u.prototype.writeIntBE=function(t,e,r,n){if(t=+t,e|=0,!n){var i=Math.pow(2,8*r-1);U(this,t,e,r,i-1,-i)}var o=r-1,s=1,a=0;for(this[e+o]=255&t;--o>=0&&(s*=256);)t<0&&0===a&&0!==this[e+o+1]&&(a=1),this[e+o]=(t/s>>0)-a&255;return e+r},u.prototype.writeInt8=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,1,127,-128),u.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},u.prototype.writeInt16LE=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):k(this,t,e,!0),e+2},u.prototype.writeInt16BE=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,2,32767,-32768),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):k(this,t,e,!1),e+2},u.prototype.writeInt32LE=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,4,2147483647,-2147483648),u.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):Y(this,t,e,!0),e+4},u.prototype.writeInt32BE=function(t,e,r){return t=+t,e|=0,r||U(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),u.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):Y(this,t,e,!1),e+4},u.prototype.writeFloatLE=function(t,e,r){return j(this,t,e,!0,r)},u.prototype.writeFloatBE=function(t,e,r){return j(this,t,e,!1,r)},u.prototype.writeDoubleLE=function(t,e,r){return F(this,t,e,!0,r)},u.prototype.writeDoubleBE=function(t,e,r){return F(this,t,e,!1,r)},u.prototype.copy=function(t,e,r,n){if(r||(r=0),n||0===n||(n=this.length),e>=t.length&&(e=t.length),e||(e=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),t.length-e<n-r&&(n=t.length-e+r);var i,o=n-r;if(this===t&&r<e&&e<n)for(i=o-1;i>=0;--i)t[i+e]=this[i+r];else if(o<1e3||!u.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+e]=this[i+r];else Uint8Array.prototype.set.call(t,this.subarray(r,r+o),e);return o},u.prototype.fill=function(t,e,r,n){if("string"==typeof t){if("string"==typeof e?(n=e,e=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===t.length){var i=t.charCodeAt(0);i<256&&(t=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!u.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<r)throw new RangeError("Out of range index");if(r<=e)return this;var o;if(e>>>=0,r=void 0===r?this.length:r>>>0,t||(t=0),"number"==typeof t)for(o=e;o<r;++o)this[o]=t;else{var s=u.isBuffer(t)?t:N(new u(t,n).toString()),a=s.length;for(o=0;o<r-e;++o)this[o+e]=s[o%a]}return this};var z=/[^+\/0-9A-Za-z-_]/g;function L(t){return t<16?"0"+t.toString(16):t.toString(16)}function N(t,e){var r;e=e||1/0;for(var n=t.length,i=null,o=[],s=0;s<n;++s){if((r=t.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(e-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(e-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((e-=1)<0)break;o.push(r)}else if(r<2048){if((e-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((e-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function C(t){return n.toByteArray(function(t){if((t=function(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"")}(t).replace(z,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function M(t,e,r,n){for(var i=0;i<n&&!(i+r>=e.length||i>=t.length);++i)e[i+r]=t[i];return i}}).call(this,r(5))},function(t,e){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,e){t.exports=require("base64-js")},function(t,e){t.exports=require("ieee754")},function(t,e){t.exports=require("isarray")}]);