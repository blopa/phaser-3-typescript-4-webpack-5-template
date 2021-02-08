/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');

// Paths
const SRC_DIR = path.resolve(__dirname, 'src');
const TEMPLATE_DIR = path.resolve(__dirname, 'template');
const IMAGE_DIR = path.resolve(__dirname, 'assets/images');
const BUILD_PATH = path.resolve(__dirname, 'dist/build');
const DIST_PATH = path.resolve(__dirname, 'dist');

const title = 'Game Title';

module.exports = async () => {
    return {
        entry: {
            app: `./${SRC_DIR}/main.ts`,
            vendor: Object.keys(packageJson.dependencies),
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },

        resolve: {
            extensions: ['.ts', '.js'],
        },

        output: {
            pathinfo: true,
            path: BUILD_PATH,
            publicPath: './build/',
            filename: '[name].bundle.js',
            chunkFilename: '[name].bundle.js',
        },

        mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',

        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            writeToDisk: true,
            open: true,
        },

        plugins: [
            // new CopyPlugin({
            //     patterns: [
            //         {
            //             from: 'index.html',
            //         },
            //         {
            //             from: 'assets/**/*',
            //         },
            //     ],
            // }),
            new webpack.DefinePlugin({
                GAME_VERSION: JSON.stringify(packageJson.version),
                GAME_TITLE: JSON.stringify(title),
                // https://snowbillr.github.io/blog/2018-04-09-a-modern-web-development-setup-for-phaser-3/
                'typeof CANVAS_RENDERER': JSON.stringify(true),
                'typeof WEBGL_RENDERER': JSON.stringify(true),
            }),
            new HtmlWebpackPlugin({
                hash: true,
                title,
                favicon: `${IMAGE_DIR}/favicon.ico`,
                template: `${TEMPLATE_DIR}/template.html`,
                filename: `${DIST_PATH}/index.html`,
                publicPath: './build',
            }),
        ],

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                        filename: '[name].app.bundle.js',
                    },
                },
            },
        },
    };
};
