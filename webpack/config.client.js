/* eslint import/no-commonjs: off */
const path = require('path');

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WORK_DIR = '/app';


module.exports = {
    mode: 'development',
    entry: `${WORK_DIR}/src/index`,
    output: {
        path: path.resolve(__dirname, "../build"),
        filename: "bundle.[contenthash].js",
        publicPath: "/static/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)|(baselib)/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
                exclude: [/source/],
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: [path.resolve(WORK_DIR, 'node_modules'), 'node_modules', `${WORK_DIR}/src`],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "./index.html",
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin(),
    ]
};

