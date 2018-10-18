# responsive-json-webpack-plugin

[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/react.svg)](https://github.com/drageniix/responsive-json-webpack-plugin)

Set resizing instructions in JSON, can also output combined JSON with responsive image attributes (picture, sources, srcset, sizes, media) included where desired.

## Basic Image Resize Usage

webpack.config.js
```javascript
const ResponsiveJSONWebpackPlugin = require
("drageniix/responsive-json-webpack-plugin")

{
    plugins: [
        new ResponsiveJSONWebpackPlugin({
            sourceImages = "src/assets/images", //default
            outputFolder = "assets" //default
        })

    ]
}
```

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

Will create an optimized and compressed 16px width "sample.png" and 32px width "sample.jpg" in "assets/images" in the output build folder.

```json
[
    {
        "files": [
            {
                "src": "folder/sample-2.png",
                "dest" : "helloworld",
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

Will create a 36px width "helloworld-huge.png" and an 8px width "helloworld-8.png" in "assets/images" in the output build folder.

## JSON Injection Usage
You can use this json directly with React with 
```javascript
import ResponsiveImage from 'responsive-json-webpack-plugin/react'

<ResponsiveImage image={json.imagePath} className="" alt="" />

```

```javascript
const ResponsiveJSONWebpackPlugin = require
("responsive-json-webpack-plugin")

{
    plugins: [
        new ResponsiveJSONWebpackPlugin({
            sourceTemplates = "src/assets/templates", //default
            sourceImages = "src/assets/images", //deafult
            outputFolder = "assets" //default
        })

    ]
}
```

### In "templates/index/data/sample.json"
```json
{
    "text" : "This is sample text.",
    "section" : {
        "title" : "Sample Section Title"
    }
}
```

### In "templates/index/data/other.json"
```json
{
    "text" : "This is other sample text.",
}
```

### In "templates/index/images/sample.json"
```json
[
    {
        "path" : "image",
        "alt" : "standard sample image",
        "files" : [
            {
                "src" : "sample-3.png",
                "size" : 16
            }
        ] 
    },
    {
        "path" : "section.image",
        "files" : [
            {
                "src" : "sample-3.png",
                "dest" : "section",
                "size" : 24
            }
        ] 
    }
]
```

Will output a 16px width "sample-3.png" and a 24px with "section.png" along with a file at **index.json**:

```json
{
    "sample" : {
        "text" : "This is sample text.",
        "image" : {
            "src" : "sample-3.png",
            "alt" :  "standard sample image",
            "size" : 16          
        },
        "section" : {
            "title" : "Sample Section Title",
            "image" : {
                "src" : "section.png",
                "size" : 24          
            }
        }
    },
    "other" : {
        "text" : "This is other sample text.",
    }
}
```

You can output an array at the path by giving multiple files.
```json
[
    {
        "path" : "multiple",
        "files" : [
            {
                "src" : "sample-2.png",
                "size" : 16
            },
            {
                "src" : "sample-3.png",
                "size" : 16
            }
        ] 
    }
]
```

You can also inject an image at each item in an exisiting an array by using this syntax. The "[]" will be replaced by the index of the item in the set. The index does not need to match the exisiting array in length, but does need a valid path.

Array set dest can use "[name]" "[size]" and "[index]", while standard usage can use "[name]" and "[size]".

```json
{
    "path" : "array.[].image",
    "set" : [
        {
            "alt" : "array item",
            "files" : [
                {
                    "src" : "sample-arr.png",
                    "size" : 16,
                    "dest" : "array-image-[index]"
                }
            ]
        }
    ]
}
```
This will output: 
```json
{
    "array" : [
        {
            "text" : "existing text in data json",
            "image" : {
                "alt" : "array item 1",
                "src" : "arr-image-1.png",
                "size" : 16          
            }
        }
    ]
}
```

## Responsive Image JSON Injection Usage

Here is a full responsive image example that utilizes both resolution switching and art direction! If your "files" image has a "dest", that will be the basis of "[name]" in the "imageTemplate" "img". Your "files" images are always copied, even if never explicitly used, to serve as a backup in case a browser doesn't support the "picture" element or the like.

Keep in mind that most fields can be safely omitted, but are recommended if you are using this with the included ResponsiveImage.jsx file.

```json
[
    {
        "path" : "responsive",
        "alt" : "Sample ALT",
        "files" : [
            {
                "src" : "sample-8.png",
                "size" : 16
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
            "sources" : [
                {
                    "media" : "(max-width: 37.5em)",
                    "sizes" : "20vw",
                    "srcset" : [
                        {
                            "src" : "sample-9.png",
                            "dest" :  "potato",
                            "size" : 16
                        },
                        {
                            "src": "sample-10.png",
                            "dest" :  "[name]-x[size]",
                            "size" : 16
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
    "src" : "sample-8.png",
    "alt" : "Sample ALT",
    "size" : 16,
    "sizes" : "(max-width: 56.25em) 20vw, (max-width: 37.5em) 30vw, 300px",
    "srcset" : [
        {
            "src" : "sample-8x8",
            "size" : 8
        }
    ],
    "sources" : [
        {
            "media" : "(max-width: 37.5em)",
            "sizes" : "20vw",
            "srcset" : [
                {
                    "src" : "potato.png",
                    "size" : 16
                },
                {
                    "src" : "sample-10-x16",
                    "size" : 16
                }
            ]
        }
    ],
}
```