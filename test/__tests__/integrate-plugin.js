const ResponsiveJSONWebpackPlugin = require('../../src/index.ts');

const rjInstance = new ResponsiveJSONWebpackPlugin();

test('apply', () => {
    rjInstance.apply({ hooks: { emit: { tapPromise() {} } } });
});

test('run', () => {
    const deps = {}

    rjInstance.processDataFolders = jest.fn();
    rjInstance.processRawFiles = jest.fn();
    rjInstance.processDirectFiles = jest.fn();
    rjInstance.getDependencies = jest.fn();
    rjInstance.getDependencies.mockReturnValue(deps);

    return rjInstance
        .run({
            assets: {},
            contextDependencies: new Set(),
            fileDependencies: new Set(),
            compiler: { context: __dirname }
        })
        .then(() => {
            expect(rjInstance.establishedDependencies).toBe(deps);
            expect(rjInstance.dirs).toEqual({
                dataPath: 'data',
                imagePath: 'images',
                rawFolder: 'raw',
                sourceTemplates:
                    'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__/src/assets/templates',
                sourceImages:
                    'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__/src/assets/images',
                outputFolder: 'assets'
            });
        });
});
