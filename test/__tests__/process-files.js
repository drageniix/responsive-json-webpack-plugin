const ResponsiveJSONWebpackPlugin = require("../../src/index.ts")

const rjInstance = new ResponsiveJSONWebpackPlugin()

describe("create portion pictures", () => {
    rjInstance.parseSource = jest.fn()
    rjInstance.parseSource.mockReturnValue({
        extension: ".jpg",
        index: 0,
        name: "basic",
        size: 16,
        src: "basic.jpg",
    })
    rjInstance.createImg = jest.fn()
    rjInstance.createImg.mockReturnValue(Promise.resolve({
        src: "test.src", size: 16
    }))
    rjInstance.createImgResolutions = jest.fn()
    rjInstance.createImgResolutions.mockReturnValue(Promise.resolve({ 
        sizes: "20w", srcset: [{}] 
    }))
    rjInstance.createPictureSources = jest.fn()
    rjInstance.createPictureSources.mockReturnValue(Promise.resolve({ 
        media: "media", sizes: "20w", srcset: [{}] 
    }))

    test("simple", () => {
        return rjInstance.createPortionPictures({
            files: [{}],
        }).then(result => expect(result).toEqual(
            { "size": 16, "sizes": "20w", "sources": { "media": "media", "sizes": "20w", "srcset": [{}] }, "src": "test.src", "srcset": [{}] }
        ))
    })

    test("multiple", () => {
        rjInstance.createPortionPictures({
            files: [{}, {}],
        }).then(result => {
            expect(result).toHaveLength(2)
            result.forEach(element => {
                expect(element).toEqual(
                    {"size": 16, "sizes": "20w", "sources": { "media": "media", "sizes": "20w", "srcset": [{}] }, "src": "test.src", "srcset": [{}]}
                )
            })
        })
    })
})

test("inject", () => {
    rjInstance.index = jest.fn()
    rjInstance.createPortionPictures = jest.fn()
    rjInstance.createPortionPictures.mockReturnValue(Promise.resolve({ 
        src: "test.src" 
    }))
    
    const data = {}
    return (
        rjInstance.injectImagesIntoDataFile(
            [{
                path: "test.path"
            }], data).then(() => 
        rjInstance.injectImagesIntoDataFile(
            [{
                path: "test.[].path",
                set: [
                    {
                        files: "sample item"
                    }
                ]
            }], {}))
    )
})
