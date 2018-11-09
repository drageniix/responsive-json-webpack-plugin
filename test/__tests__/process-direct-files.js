/* eslint-disable no-console */
const ResponsiveJSONWebpackPlugin = require('../../src/index.ts');

const rjInstance = new ResponsiveJSONWebpackPlugin({
    sourceTemplates:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates',
    sourceImages:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/images',
    outputFolder:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__/examples/output'
});

rjInstance.saveJSON = jest.fn();

test('direct', () =>
    rjInstance.processDirectFiles(['rawtest']).then(() => {
        expect(rjInstance.saveJSON).toHaveBeenCalledTimes(1);
        expect(rjInstance.saveJSON).toHaveBeenCalledWith('rawtest', [
            {
                foo: 'bar'
            }
        ]);
    }));

test('invalid', () => {
    rjInstance.logErrors = jest.fn();

    return rjInstance.processDirectFiles(['invalid']).then(() => {
        expect(rjInstance.logErrors).toHaveBeenCalled();
        expect(rjInstance.saveJSON).toHaveBeenCalledTimes(1);
    });
});
