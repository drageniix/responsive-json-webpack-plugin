const ResponsiveJSONWebpackPlugin = require("../../src/index.ts");
const dir = require("path")
  .resolve(__dirname, "../")
  .replace(/\\/g, "/");

const rjInstance = new ResponsiveJSONWebpackPlugin({
  sourceTemplates: dir + "/examples/templates",
  sourceImages: dir + "/examples/images",
  outputFolder: dir + "/__tests__/examples/output"
});

const fileDependencies = [];
const contextDependencies = [];

const compilation = {
  contextDependencies: new Set(),
  fileDependencies: new Set(),
  compiler: {
    context: dir + "/__tests__"
  }
};

describe("Dependencies", () => {
  test("read directory", () => {
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

  test("new fileDependencies", () => {
    expect(rjInstance.getChangedDependencies(fileDependencies)).toEqual({
      folders: {
        index: {
          lastUpdate: expect.any(Number),
          filenames: [
            "data/_sample.json",
            "data/icons.json",
            "images/_sample.json",
            "images/icons.json"
          ]
        },
        secondary: {
          lastUpdate: expect.any(Number),
          filenames: ["data/other.json"]
        }
      },
      files: {
        [dir + "/examples/templates/invalid.json"]: expect.any(Number),
        [dir + "/examples/templates/pure.json"]: expect.any(Number)
      },
      direct: {
        [dir + "/examples/templates/raw/rawtest.json"]: expect.any(Number),
        [dir + "/examples/templates/raw/invalid.json"]: expect.any(Number)
      },
      changedFolders: ["index", "secondary"],
      changedPureFiles: [
        dir + "/examples/templates/invalid.json",
        dir + "/examples/templates/pure.json"
      ],
      changedDirectFiles: ["invalid", "rawtest"]
    });
  });

  test("changed fileDependencies", () => {
    rjInstance.establishedDependencies.folders = {
      index: {
        lastUpdate: 1582625901337,
        filenames: [
          "data/_sample.json",
          "data/icons.json",
          "images/_sample.json",
          "images/icons.json"
        ]
      }
    };
    rjInstance.establishedDependencies.files = {
      [dir + "/examples/templates/pure.json"]: 1582625901337
    };

    rjInstance.establishedDependencies.direct = {
      [dir + "/examples/templates/raw/invalid.json"]: 1582625901337
    };

    expect(rjInstance.getChangedDependencies(fileDependencies)).toEqual({
      changedFolders: ["secondary"],
      changedPureFiles: [dir + "/examples/templates/invalid.json"],
      changedDirectFiles: ["rawtest"],
      files: {
        [dir + "/examples/templates/invalid.json"]: expect.any(Number),
        [dir + "/examples/templates/pure.json"]: expect.any(Number)
      },
      direct: {
        [dir + "/examples/templates/raw/rawtest.json"]: expect.any(Number),
        [dir + "/examples/templates/raw/invalid.json"]: expect.any(Number)
      },
      folders: {
        index: {
          filenames: [
            "data/_sample.json",
            "data/icons.json",
            "images/_sample.json",
            "images/icons.json"
          ],
          lastUpdate: expect.any(Number)
        },
        secondary: {
          filenames: ["data/other.json"],
          lastUpdate: expect.any(Number)
        }
      }
    });
  });

  test("get fileDependencies", () => {
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
