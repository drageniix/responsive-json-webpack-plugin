const path = require("path")
const fs = require("fs-extra")

const nodeModules = {};
fs.readdirSync("node_modules")
    .filter(item => [".bin"].indexOf(item) === -1)  // exclude the .bin folder
    .forEach((mod) => {
        nodeModules[mod] = "commonjs " + mod;
    });

module.exports = () => ({
    externals: nodeModules,
    entry: {
        index: ["./src/index.js"],
        react: ["./src/react.js"]
    },
    output: {
        path: path.resolve(__dirname),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }
        ]
    },
})