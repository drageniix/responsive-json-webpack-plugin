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
        compiler: { context: "D:\\Dropbox\\Programming\\Web Development\\_Packages\\ResponsiveJSONWebpackPlugin\\test\\__tests__" }
    })
})