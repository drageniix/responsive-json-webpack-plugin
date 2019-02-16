/* eslint-disable no-console */
const ResponsiveJSONWebpackPlugin = require("../../src/index.ts");

let rjInstance;

test("initialization", () => {
  rjInstance = new ResponsiveJSONWebpackPlugin();
  expect(rjInstance).toBeTruthy();

  rjInstance = new ResponsiveJSONWebpackPlugin({
    dataPath: "data",
    imagePath: "images",
    sourceTemplates: "../examples/templates",
    sourceImages: "../examples/images",
    outputFolder: "examples/output"
  });
  expect(rjInstance).toBeTruthy();
});

describe("save to assets", () => {
  test("save json", () => {
    rjInstance.assets = {};
    const data = [{ data: "one" }, { datum: "two" }];
    const stringData = JSON.stringify(Object.assign({}, ...data));
    const expectedPath = "./examples/output/data/hi.json";

    rjInstance.saveJSON("hi", data);
    expect(rjInstance.assets[expectedPath].source()).toEqual(
      Buffer.from(stringData)
    );
    expect(rjInstance.assets[expectedPath].size()).toBe(stringData.length);
  });

  test("valid image source", () => {
    const src = "sample-1-out.png";
    const size = 16;
    const sourceFileName = "test/examples/images/sample-1.png";

    rjInstance.processedFileNames = [];
    rjInstance.assets = {};

    const expectedPath = `./${src}`;
    return rjInstance.savePicture(sourceFileName, { src, size }).then(() => {
      expect(rjInstance.processedFileNames).toHaveLength(1);
      expect(rjInstance.processedFileNames[0]).toBe(src);
      expect(Object.keys(rjInstance.assets)).toHaveLength(1);
      expect(Object.keys(rjInstance.assets)[0]).toBe(expectedPath);
      expect(rjInstance.assets[expectedPath].size()).toBe(293);
      // prettier-ignore
      expect(rjInstance.assets[expectedPath].source().toJSON()).toEqual({
                    "data": [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 16, 0, 0, 0, 16, 8, 6, 0, 0, 0, 31, 243, 255, 97, 0, 0, 0, 9, 112, 72, 89, 115, 0, 0, 11, 18, 0, 0, 11, 18, 1, 210, 221, 126, 252, 0, 0, 0, 215, 73, 68, 65, 84, 56, 203, 99, 96, 96, 96, 248, 15, 197, 32, 16, 68, 36, 141, 172, 7, 149, 67, 36, 32, 90, 79, 10, 16, 95, 133, 42, 190, 10, 229, 99,
                        128, 32, 92, 154, 61, 157, 212, 255, 191, 127, 188, 231, 255, 215, 151, 251, 255, 191, 185, 183, 254, 63, 136, 143, 100, 72, 16, 33, 219, 175, 130, 52,
                        127, 122, 184, 244, 255, 187, 107, 13, 96, 252, 224, 100, 5, 204, 37, 88, 93, 240, 31, 27, 134, 105, 134, 97, 44,
                        1, 142, 8, 152, 23, 213, 137, 255, 159, 36, 58, 195, 49, 204, 144, 165, 83,
                        34, 136, 115, 1, 72, 211, 125, 39, 57, 56, 6, 137, 29, 58, 113, 1, 76, 239,
                        94, 158, 66, 48, 12, 48, 12, 104, 106, 106, 250, 223, 189, 104, 247, 127, 98, 99, 1, 197, 128, 90, 37, 222, 63, 199, 47, 220, 248, 95, 58, 97, 221, 255, 196, 138, 137, 32, 3, 182, 17, 138, 61, 20, 3, 178, 178, 178, 254, 207, 219, 120, 12, 108, 0, 8, 67, 93, 225, 139, 215, 5, 200, 24, 102, 59, 12, 67, 93, 241, 159, 136, 244, 131, 59, 74, 113, 37, 95, 138, 243, 2, 197, 185, 145,
                        34, 0, 0, 87, 221, 205, 45, 105, 239, 201, 78, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130], 
                    "type": "Buffer"
                })
    });
  });

  test("duplicate image dest", () => {
    const src = "sample-1-out.png";
    const size = 16;
    const sourceFileName = "test/examples/images/sample-1.png";

    rjInstance.processedFileNames = [src];
    rjInstance.assets = { [`./${src}`]: {} };

    return rjInstance.savePicture(sourceFileName, { src, size }).then(() => {
      expect(rjInstance.processedFileNames).toHaveLength(1);
      expect(rjInstance.processedFileNames[0]).toBe(src);
      expect(Object.keys(rjInstance.assets)).toHaveLength(1);
      expect(Object.keys(rjInstance.assets)[0]).toBe(`./${src}`);
    });
  });

  test("invalid image source", () => {
    const src = "sample-1.png";
    const size = 16;
    const sourceFileName = "invalidpath";
    rjInstance.logErrors = jest.fn();

    rjInstance.processedFileNames = [];
    rjInstance.assets = {};

    return rjInstance.savePicture(sourceFileName, { src, size }).then(() => {
      expect(rjInstance.logErrors).toHaveBeenCalled();
      expect(rjInstance.processedFileNames).toHaveLength(0);
      expect(Object.keys(rjInstance.assets)).toHaveLength(0);
    });
  });
});

describe("generation of file names", () => {
  test("valid input", () => {
    expect(
      rjInstance.generateFileName(
        {
          name: "abc",
          index: 7,
          size: 16,
          extension: ".webp"
        },
        "potato-[name]-[index]-[size]"
      )
    ).toBe("examples/output/images/potato-abc-7-16.webp");
  });

  test("strip invalid characters", () => {
    expect(
      rjInstance.generateFileName(
        {
          name: "#2@3/",
          extension: ".png"
        },
        "potato[name]@$[index]<[size]"
      )
    ).toBe("examples/output/images/potato#2@3/@1.png");
  });

  test("empty input", () => {
    expect(() => rjInstance.generateFileName()).toThrowError();
  });

  test("slashes", () => {
    expect(rjInstance.getFirstSlash("a\\b\\c")).toBe(1);
    expect(rjInstance.getFirstSlash("a/b/c")).toBe(1);
    expect(rjInstance.getFirstSlash("a\\/b/\\c")).toBe(1);
    expect(rjInstance.getFirstSlash("abc")).toBe(-1);
    expect(rjInstance.getLastSlash("a\\b\\c")).toBe(3);
    expect(rjInstance.getLastSlash("a/b/c")).toBe(3);
    expect(rjInstance.getLastSlash("a/\\b/\\c")).toBe(5);
    expect(rjInstance.getLastSlash("abc")).toBe(-1);
  });
});

describe("insertion of json", () => {
  test("invalid", () => {
    const obj = {};
    expect(rjInstance.index(obj, [], 3)).toEqual({});
  });
  test("simple", () => {
    const simpleObj = {};
    rjInstance.index(simpleObj, "key", "value");
    expect(simpleObj).toEqual({
      key: "value"
    });
  });

  test("nested", () => {
    const nestingObj = { existing: {} };
    rjInstance.index(nestingObj, "existing.key", "value");
    expect(nestingObj).toEqual({
      existing: {
        key: "value"
      }
    });
  });

  test("array", () => {
    const nestingArr = {
      arr: [{ name: "one" }, { name: "two" }, { name: "three" }]
    };
    rjInstance.index(nestingArr, "arr.1.key", "value");
    expect(nestingArr).toEqual({
      arr: [
        { name: "one" },
        {
          name: "two",
          key: "value"
        },
        { name: "three" }
      ]
    });
  });
});
