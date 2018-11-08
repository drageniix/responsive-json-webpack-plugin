const ResponsiveJSONWebpackPlugin = require('../../src/index.ts');

const rjInstance = new ResponsiveJSONWebpackPlugin({
    sourceTemplates:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates',
    sourceImages:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/images',
    outputFolder:
        'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__/examples/output'
});

const fileDependencies = [];
const contextDependencies = [];

const compilation = {
    contextDependencies: new Set(),
    fileDependencies: new Set(),
    compiler: {
        context:
            'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/__tests__'
    }
};

describe('Dependencies', () => {
    test('read directory', () => {
        rjInstance.readFolderDependencies(
            rjInstance.dirs.sourceTemplates,
            compilation.compiler.context,
            fileDependencies,
            contextDependencies
        );

        expect(fileDependencies).toHaveLength(9);
        expect(contextDependencies).toHaveLength(7);

        expect(
            rjInstance.readFolderDependencies(
                rjInstance.dirs.sourceTemplates,
                compilation.compiler.context
            )
        ).toEqual({ fileDependencies, contextDependencies });
    });

    test('new fileDependencies', () => {
        expect(rjInstance.getChangedDependencies(fileDependencies)).toEqual({
            folders: {
                index: {
                    lastUpdate: expect.any(Number),
                    filenames: [
                        'data/icons.json',
                        'data/_sample.json',
                        'images/icons.json',
                        'images/_sample.json'
                    ]
                },
                secondary: {
                    lastUpdate: expect.any(Number),
                    filenames: ['data/other.json']
                }
            },
            files: {
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/invalid.json': expect.any(
                    Number
                ),
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/pure.json': expect.any(
                    Number
                )
            },
            direct: {
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/raw/rawtest.json': expect.any(
                    Number
                ),
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/raw/invalid.json': expect.any(
                    Number
                )
            },
            changedFolders: ['index', 'secondary'],
            changedPureFiles: [
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/invalid.json',
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/pure.json'
            ],
            changedDirectFiles: ['invalid', 'rawtest']
        });
    });

    test('changed fileDependencies', () => {
        rjInstance.establishedDependencies.folders = {
            index: {
                lastUpdate: 1540079321855,
                filenames: [
                    'data/icons.json',
                    'data/_sample.json',
                    'images/icons.json',
                    'images/_sample.json'
                ]
            }
        };
        rjInstance.establishedDependencies.files = {
            'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/pure.json': 1539124763943
        };

        rjInstance.establishedDependencies.direct = {
            'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/raw/invalid.json': 1541718519792
        };

        expect(rjInstance.getChangedDependencies(fileDependencies)).toEqual({
            changedFolders: ['secondary'],
            changedPureFiles: [
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/invalid.json'
            ],
            changedDirectFiles: ['rawtest'],
            files: {
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/invalid.json': expect.any(
                    Number
                ),
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/pure.json': expect.any(
                    Number
                )
            },
            direct: {
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/raw/rawtest.json': expect.any(
                    Number
                ),
                'D:/Dropbox/Programming/Web Development/_Packages/ResponsiveJSONWebpackPlugin/test/examples/templates/raw/invalid.json': expect.any(
                    Number
                )
            },
            folders: {
                index: {
                    filenames: [
                        'data/icons.json',
                        'data/_sample.json',
                        'images/icons.json',
                        'images/_sample.json'
                    ],
                    lastUpdate: expect.any(Number)
                },
                secondary: {
                    filenames: ['data/other.json'],
                    lastUpdate: expect.any(Number)
                }
            }
        });
    });

    test('get fileDependencies', () => {
        const changedDeps = { test: undefined };
        rjInstance.readFolderDependencies = jest.fn();
        rjInstance.readFolderDependencies.mockReturnValue({
            fileDependencies,
            contextDependencies
        });
        rjInstance.getChangedDependencies = jest.fn();
        rjInstance.getChangedDependencies.mockReturnValue(changedDeps);

        expect(rjInstance.getDependencies(compilation)).toEqual({
            fileDependencies,
            contextDependencies,
            ...changedDeps
        });

        expect(compilation.contextDependencies.size).toBe(
            contextDependencies.length
        );
        expect(compilation.fileDependencies.size).toBe(fileDependencies.length);
    });
});
