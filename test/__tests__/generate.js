const ResponsiveJSONWebpackPlugin = require("../../src/index.ts")
const rjInstance = new ResponsiveJSONWebpackPlugin({
    sourceTemplates: "../examples/templates",
    sourceImages: "../examples/images",
    outputFolder: "examples/output"
})

rjInstance.savePicture = jest.fn()
rjInstance.savePicture.mockReturnValue(Promise.resolve())
rjInstance.generateFileName = jest.fn()
rjInstance.generateFileName.mockReturnValue("out.jpg")

const source = {
    extension: ".jpg",
    index: 0,
    name: "basic",
    size: 16,
    src: "basic.jpg",
}

test("parse source", () => {
    expect(rjInstance.parseSource(1, 0,
        {
            src: "basic.jpg",
            size: 16
        }
    )).toEqual(source)
    
    expect(rjInstance.parseSource(1, 1,
        {
            src: "withDest.tiff",
            size: 16,
            dest: "destination"
        }
    )).toEqual(
        {
            extension: ".tiff",
            index: 0,
            name: "destination",
            size: 16,
            src: "withDest.tiff",
        }
    )

    expect(rjInstance.parseSource(3, 0,
        {
            src: "folder/inArray.jpg",
            size: 16
        }
    )).toEqual(
        {
            extension: ".jpg",
            index: 1,
            name: "inArray",
            size: 16,
            src: "folder/inArray.jpg",
        }
    )

    expect(rjInstance.parseSource(2, 0,
        {
            src: "inArrayAlt.jpg",
            size: 16
        }
    , "sample alt")).toEqual(
        {
            extension: ".jpg",
            index: 1,
            name: "inArrayAlt",
            size: 16,
            src: "inArrayAlt.jpg",
            alt: "sample alt 1"
        }
    )
})

describe("create img", () => {
    test("standard input", () => 
        rjInstance.createImg(source, "potato").then(img => {
            const sampleImg = {
                src: "out.jpg",
                size: 16,
                alt: undefined
            }

            expect(img).toEqual(sampleImg)
            expect(rjInstance.savePicture).toHaveBeenCalledWith(
                "../examples/images/basic.jpg",
                sampleImg   
            )
        })
    )
})

describe("picture img", () => {
    test("none", () => rjInstance.createImgResolutions(source))
    
    test("empty", () => rjInstance.createImgResolutions(source, {}))
    
    test("standard", () => 
        rjInstance.createImgResolutions(source, {
            img: {
                sizes: "XXL",
                srcset: [
                    {
                        dest: "booty",
                        size: 16
                    },
                    {
                        dest: "bootybutt",
                        size: 16
                    }
                ]
            }
        }).then(arr => {
            expect(rjInstance.savePicture).toHaveBeenLastCalledWith(
                "../examples/images/basic.jpg",
                { 
                    src: "out.jpg", 
                    size: 16 
                }
            )

            expect(arr).toEqual({
                sizes: "XXL",
                srcset: [
                    { src: "out.jpg", size: 16 }, 
                    { src: "out.jpg", size: 16 }
                ]
            })
        })
    )
})

describe("picture sources", () => {
    test("none", () => rjInstance.createPictureSources(source))

    test("empty", () => rjInstance.createPictureSources(source, {}))
    
    test("standard", () =>
        rjInstance.createPictureSources(source, {
            sources: [
                {
                    sizes: "XXL",
                    media: "SCREEN",
                    srcset: [
                        {
                            src: "hm",
                            dest: "booty",
                            size: 16
                        },
                        {
                            src: "bootybutt",
                            size: 16
                        }
                    ]
                }
            ]
        }).then(arr => expect(arr[0]).toEqual(
            {
                media: "SCREEN",
                sizes: "XXL",
                srcset: [
                    { src: "out.jpg", size: 16 }, 
                    { src: "out.jpg", size: 16 }
                ]
            }
        ))
    )
})
