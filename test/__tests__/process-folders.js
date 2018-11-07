const ResponsiveJSONWebpackPlugin = require('../../src/index.ts');

const rjInstance = new ResponsiveJSONWebpackPlugin({
    sourceTemplates:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates',
    sourceImages:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/images',
    outputFolder:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__/examples/output'
});

rjInstance.establishedDependencies.folders = {
    index: {
        filenames: [
            'data/icons.json',
            'data/_sample.json',
            'images/icons.json',
            'images/_sample.json'
        ]
    },
    secondary: {
        filenames: ['data/other.json']
    }
};

describe('integrated files', () => {
    test('process files', () => {
        rjInstance.injectImagesIntoDataFile = jest.fn();
        console.error = jest.fn();

        return rjInstance.processDataFiles('index').then(result => {
            expect(result[1]['sample']).toBeTruthy();
            expect(result[0]['icons']).toBeTruthy();
            expect(rjInstance.injectImagesIntoDataFile).toHaveBeenCalledTimes(
                1
            );
            expect(console.error).toHaveBeenCalled();
            console.error.mockRestore();
        });
    });

    test('process folder', () => {
        rjInstance.processDataFiles = jest.fn();
        rjInstance.processDataFiles.mockReturnValue(Promise.resolve());
        rjInstance.saveJSON = jest.fn();

        return rjInstance
            .processDataFolders(['index', 'secondary'])
            .then(result => {
                expect(result).toHaveLength(2);
                expect(rjInstance.saveJSON).toHaveBeenCalledTimes(2);
            });
    });
});
