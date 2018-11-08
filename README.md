# responsive-json-webpack-plugin

[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://www.npmjs.com/package/responsive-json-webpack-plugin)

Set resizing instructions in JSON, can also output combined JSON with responsive image attributes (picture, sources, srcset, sizes, media) included where desired. Uses [sharp](https://www.npmjs.com/package/sharp). **100% Test Coverage**! _Requires Webpack 4._

## Install

```
npm install responsive-json-webpack-plugin



```

#### webpack.config.js (Webpack 4)

```javascript
const ResponsiveJSONWebpackPlugin = require("responsive-json-webpack-plugin")







{



    plugins: [



        new ResponsiveJSONWebpackPlugin({



            sourceTemplates = "src/assets/templates" //default



            sourceImages = "src/assets/images", //default



            outputFolder = "assets" //default



        })



    ]



}



```

# As JSON copier

If you just want to directly copy a json file to your build folder without having to require it in your javascript via a separate loader, put it in a folder called "raw" in your templates. It will be minimized and put in the outputFolder/data with the same name.

# Basic Image Resize Usage

The following will create an optimized and compressed 16px width "sample.png" and 32px width "sample.jpg" in "assets/images" in the output build folder, given that the appropriate source files are in "src/assets/images".

src/assets/templates/images.json

```json
[
    {
        "files": [
            {
                "src": "sample.png",
                "size": 16
            },
            {
                "src": "sample.jpg",
                "size": 32
            }
        ]
    }
]
```

The following will create a 36px width "helloworld-huge.png" and an 8px width "helloworld-8.png" in "assets/images" in the output build folder. Note that `[name]` and `[size]` will be replaced appropriately.

```json
[
    {
        "files": [
            {
                "src": "folder/sample-2.png",
                "dest": "helloworld",
                "size": 16
            }
        ],
        "alternates": [
            {
                "size": 36,
                "dest": "[name]-huge"
            },
            {
                "size": 8,
                "dest": "[name]-[size]"
            }
        ]
    }
]
```

# JSON Injection Usage

JSON injection uses the same webpack options, but requires a folder structure where the first subdirectory in the template folder is the output json file name. It must contain the folders "data" and "images", with matching filenames for those which belong to the same key. E.g.:

### In "templates/index/data/sample.json"

```json
{
    "text": "This is sample text.",
    "section": {
        "title": "Sample Section Title"
    }
}
```

### In "templates/index/data/other.json"

```json
{
    "text": "This is other sample text."
}
```

### In "templates/index/images/sample.json"

```json
[
    {
        "path": "image",
        "alt": "standard sample image",
        "files": [
            {
                "src": "sample-3.png",
                "size": 16
            }
        ]
    },
    {
        "path": "section.image",
        "files": [
            {
                "src": "sample-3.png",
                "dest": "section",
                "size": 24
            }
        ]
    }
]
```

Will output a 16px width "sample-3.png" and a 24px with "section.png" along with a file at **index.json**:

```json
{
    "sample": {
        "text": "This is sample text.",
        "image": {
            "src": "sample-3.png",
            "alt": "standard sample image",
            "size": 16
        },
        "section": {
            "title": "Sample Section Title",
            "image": {
                "src": "section.png",
                "size": 24
            }
        }
    },
    "other": {
        "text": "This is other sample text."
    }
}
```

You can also output an array at the path by giving multiple files in an image template file.

```json
[
    {
        "path": "multiple",
        "files": [
            {
                "src": "sample-2.png",
                "size": 16
            },
            {
                "src": "sample-3.png",
                "size": 16
            }
        ]
    }
]
```

It is possible to inject an image at each item in an exisiting an array by using the following syntax.

The `[]` will be replaced by the index of the item in the set. The index does not need to match the exisiting array in length, but does need a valid path. Set destination file names will replace `[name]` `[size]` and `[index]` appropriately.

```json
{
    "path": "array.[].image",
    "set": [
        {
            "alt": "array item",
            "files": [
                {
                    "src": "sample-arr.png",
                    "size": 16,
                    "dest": "array-image-[index]"
                }
            ]
        }
    ]
}
```

This will output:

```json
{
    "array": [
        {
            "text": "existing text in data json",
            "image": {
                "alt": "array item 1",
                "src": "arr-image-1.png",
                "size": 16
            }
        }
    ]
}
```

# Responsive Image JSON Injection Usage

Here is a full responsive image example that utilizes both resolution switching and art direction! If your source file has a "dest", that will be the basis of `[name]`. Your `files` images are always copied, even if never explicitly used, to serve as a backup in case a browser doesn't support the picture" element or the like.

Keep in mind that most fields can be safely omitted, but are recommended if you are using this with the included React file.

```json
[
    {
        "path": "responsive",
        "alt": "Sample ALT",
        "files": [
            {
                "src": "sample-8.png",
                "size": 16
            }
        ],
        "imageTemplate": {
            "img": {
                "sizes": "(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px",
                "srcset": [
                    {
                        "dest": "[name]x8",
                        "size": 8
                    }
                ]
            },
            "sources": [
                {
                    "media": "(max-width: 37.5em)",
                    "sizes": "20vw",
                    "srcset": [
                        {
                            "src": "sample-9.png",
                            "dest": "potato",
                            "size": 16
                        },
                        {
                            "src": "sample-10.png",
                            "dest": "[name]-x[size]",
                            "size": 16
                        }
                    ]
                }
            ]
        }
    }
]
```

Which will output:

```json
{
    "src": "sample-8.png",
    "alt": "Sample ALT",
    "size": 16,
    "sizes": "(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px",
    "srcset": [
        {
            "src": "sample-8x8",
            "size": 8
        }
    ],
    "sources": [
        {
            "media": "(max-width: 37.5em)",
            "sizes": "20vw",
            "srcset": [
                {
                    "src": "potato.png",
                    "size": 16
                },
                {
                    "src": "sample-10-x16",
                    "size": 16
                }
            ]
        }
    ]
}
```

# React

You can use the resulting json directly with React.

```javascript
import ResponsiveImage from 'responsive-json-webpack-plugin/react'



<ResponsiveImage image={outputJSON.imagePath} className="" alt="" />



```
