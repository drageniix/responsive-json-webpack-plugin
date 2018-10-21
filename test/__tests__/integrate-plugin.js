const ResponsiveJSONWebpackPlugin = require("../../src/index.ts")

const rjInstance = new ResponsiveJSONWebpackPlugin()

test("apply", () => {
    rjInstance.apply({hooks:{emit: {tapPromise(){}}}})
})

test("run", () => {
    rjInstance.getDependencies = jest.fn()
    rjInstance.getChangedDependencies = jest.fn()
    rjInstance.getChangedDependencies.mockReturnValue({
        folders: {}, 
        files: {}, 
        changedFolders: [], 
        changedPureFiles: []
    })
    
    rjInstance.processDataFolders = jest.fn()
    rjInstance.processRawFiles = jest.fn()
    
    return rjInstance.run({
        assets: {},
        contextDependencies: new Set(),
        fileDependencies: new Set(),
        compiler: { context: __dirname }
    }).then(() => {
        expect(rjInstance.dirs).toEqual(
            {
                dataPath: 'data',
                imagePath: 'images',
                sourceTemplates: 'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__/src/assets/templates',
                sourceImages: 'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__/src/assets/images',
                outputFolder: 'assets'
            }
        )
    })
})