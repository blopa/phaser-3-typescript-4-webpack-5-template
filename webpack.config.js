/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/main.ts',
        vendors: ['phaser'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
        filename: '[name].app.bundle.js',
        path: path.resolve(__dirname, 'dist', 'build'),
    },
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        writeToDisk: true,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Sample game',
            favicon: path.resolve(__dirname, 'assets', 'images', 'favicon.ico'),
            template: `template.html`,
            filename: path.resolve(__dirname, 'dist', 'index.html'),
            publicPath: './build',
        }),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: false,
                    // cacheGroupKey here is `commons` as the key of the cacheGroup
                    // name(module, chunks, cacheGroupKey) {
                    //     const moduleFileName = module
                    //         .identifier()
                    //         .split('/')
                    //         .reduceRight((item) => item);
                    //     const allChunksNames = chunks.map((item) => item.name).join('~');
                    //     return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
                    // },
                    chunks: 'all',
                    filename: '[name].app.bundle.js',
                },
            },
        },
    },
};
