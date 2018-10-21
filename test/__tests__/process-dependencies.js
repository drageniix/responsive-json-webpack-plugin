const ResponsiveJSONWebpackPlugin = require("../../src/index.ts")

const rjInstance = new ResponsiveJSONWebpackPlugin({
    sourceTemplates: "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates",
    sourceImages: "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/images",
    outputFolder: "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__/examples/output"
})

const dependencies = []
const compilation = {
    contextDependencies: new Set(),
    fileDependencies: new Set(),
    compiler: { context: "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__" }
}

describe("dependencies", () => {
        
    test("read directory", () => {
        rjInstance.readFolderDependencies(rjInstance.dirs.sourceTemplates, compilation.compiler.context, dependencies)
        expect(dependencies).toHaveLength(8)
        expect(rjInstance.readFolderDependencies(rjInstance.dirs.sourceTemplates, compilation.compiler.context)).toEqual(dependencies)
    })

    test("get dependencies", () => {
        rjInstance.readFolderDependencies = jest.fn()
        rjInstance.readFolderDependencies.mockReturnValue(dependencies)
        expect(rjInstance.getDependencies(compilation)).toBe(dependencies)
        expect(compilation.contextDependencies.size).toBe(1)
        expect(compilation.fileDependencies.size).toBe(dependencies.length)
    })

    test("new dependencies", () => {
        expect(rjInstance.getChangedDependencies(dependencies)).toEqual({
            folders: {
                index: {
                    lastUpdate: expect.any(Number),
                    filenames: [
                        "data/icons.json",
                        "data/_sample.json",
                        "images/icons.json",
                        "images/_sample.json"
                    ]
                },
                secondary: { 
                    lastUpdate: expect.any(Number), 
                    filenames: ["data/other.json"] 
                }
            },
            files: { 
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/invalid.json": expect.any(Number),
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/pure.json": expect.any(Number) 
            },
            "direct": {
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/raw/rawtest.json": expect.any(Number),
            },
            changedFolders: [
                "index", "secondary"
            ],
            changedPureFiles: [
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/invalid.json",
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/pure.json"
            ],
            changedDirectFiles: [
                "rawtest"
            ]
        })

    })

    test("changed dependencies", () => {
        rjInstance.folders = {
            index: {
                lastUpdate: 1540079321855,
                filenames: [
                    "data/icons.json",
                    "data/_sample.json",
                    "images/icons.json",
                    "images/_sample.json"
                ]
            }
        }
        rjInstance.files = {
            "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/pure.json": 1539124763943
        }

        expect(rjInstance.getChangedDependencies(dependencies)).toEqual({
            "changedFolders": [
                "secondary"
            ],
            "changedPureFiles": [
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/invalid.json",
            ],
            changedDirectFiles : [
                "rawtest"
            ],
            "files": {
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/invalid.json": expect.any(Number),
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/pure.json": expect.any(Number)
            },
            "direct": {
                "D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/raw/rawtest.json": expect.any(Number),
            },
            "folders": {
                "index": {
                    "filenames": [
                        "data/icons.json",
                        "data/_sample.json",
                        "images/icons.json",
                        "images/_sample.json"
                    ],
                    "lastUpdate": expect.any(Number)
                },
                "secondary": {
                    "filenames": [
                        "data/other.json"
                    ],
                    "lastUpdate": expect.any(Number)
                }
            }
        })
    })
})