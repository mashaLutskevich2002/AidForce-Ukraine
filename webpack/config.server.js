const path = require('path')
const nodeExternals = require('webpack-node-externals')

const WORK_DIR = '/app';

module.exports = {
    entry: `${WORK_DIR}/server.js`,
    output: {
        path: path.resolve(__dirname, "../"),
        filename: "server.builded.js",
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
    },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            {
                // Transpiles ES6-8 into ES5
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
        ]
    }
}