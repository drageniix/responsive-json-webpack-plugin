/* eslint-disable no-console */
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

describe("raw files", () => {
    test("single with no alternates", () => {
        return rjInstance.processRawItem([
            {
                "src": "sample-1.png",
                "size": 16
            }
        ]).then(result => {
            expect(result).toHaveLength(1)
            expect(rjInstance.savePicture.mock.calls).toHaveLength(1)
            expect(rjInstance.savePicture).toHaveBeenLastCalledWith("../examples/images/sample-1.png", { "size": 16, "src": "out.jpg" })
        })
    })

    test("multiple with alternates", () => {
        return rjInstance.processRawItem(
            [
                {
                    "src": "sample-2.png"
                },
                {
                    "src": "sample-3.png"
                }
            ],[
                {
                    "size": 36,
                    "dest": "[name]-huge"
                },
                {
                    "size": 8,
                    "dest": "[name]-smaller"
                }
            ]
        ).then(result => {
            expect(result[0]).toHaveLength(2)
            expect(rjInstance.savePicture).toHaveBeenCalledTimes(5)
            expect(rjInstance.savePicture).toHaveBeenLastCalledWith("../examples/images/sample-3.png", { "size": 8, "src": "out.jpg" })
        })
    })

    test("read JSON", () => {
        rjInstance.processRawItem = jest.fn()
        return rjInstance.processRawFiles([
            "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\examples\\templates\\pure.json"
        ]).then(result => {
            expect(result).toHaveLength(1)
            expect(result[0]).toHaveLength(3)
            expect(rjInstance.processRawItem).toHaveBeenCalledTimes(3)
        })
    })

    test("reject invalid JSON", () => {
        rjInstance.processRawItem = jest.fn()
        console.error = jest.fn()
        return rjInstance.processRawFiles([
            "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\examples\\templates\\invalid.json"
        ]).then(() => {
            expect(console.error).toHaveBeenCalled();
            console.error.mockRestore()
        })
    })
})