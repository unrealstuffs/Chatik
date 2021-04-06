const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/js/index.js",
    devtool: "inline-source-map",
    target: "electron-renderer",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        esmodules: true,
                                    },
                                },
                            ],
                            "@babel/preset-react",
                        ],
                    },
                },
            },
            {
                test: [/\.s[ac]ss$/i, /\.css$/i],
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    plugins: [new webpack.ExternalsPlugin("commonjs", ["electron"])],
    resolve: {
        extensions: [".js"],
    },
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "build", "js"),
    },
};
