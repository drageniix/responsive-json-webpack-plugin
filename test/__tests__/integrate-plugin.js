const ResponsiveJSONWebpackPlugin = require("../../src/index.ts");
const dir = require("path")
  .resolve(__dirname, "../")
  .replace(/\\/g, "/");
const rjInstance = new ResponsiveJSONWebpackPlugin();

test("apply", () => {
  rjInstance.apply({ hooks: { emit: { tapPromise() {} } } });
});

test("run", () => {
  const deps = {};

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
        dataPath: "data",
        imagePath: "images",
        rawFolder: "raw",
        sourceTemplates: dir + "/__tests__/src/assets/templates",
        sourceImages: dir + "/__tests__/src/assets/images",
        outputFolder: "assets"
      });
    });
});
