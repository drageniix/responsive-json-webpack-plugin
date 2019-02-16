/* eslint-disable no-console */
const ResponsiveJSONWebpackPlugin = require("../../src/index.ts");
const dir = require("path")
  .resolve(__dirname, "../")
  .replace(/\\/g, "/");

const rjInstance = new ResponsiveJSONWebpackPlugin({
  sourceTemplates: dir + "/examples/templates",
  sourceImages: dir + "/examples/images",
  outputFolder: dir + "/__tests__/examples/output"
});

rjInstance.saveJSON = jest.fn();

test("direct", () =>
  rjInstance.processDirectFiles(["rawtest"]).then(() => {
    expect(rjInstance.saveJSON).toHaveBeenCalledTimes(1);
    expect(rjInstance.saveJSON).toHaveBeenCalledWith("rawtest", [
      {
        foo: "bar"
      }
    ]);
  }));

test("invalid", () => {
  rjInstance.logErrors = jest.fn();

  return rjInstance.processDirectFiles(["invalid"]).then(() => {
    expect(rjInstance.logErrors).toHaveBeenCalled();
    expect(rjInstance.saveJSON).toHaveBeenCalledTimes(1);
  });
});
