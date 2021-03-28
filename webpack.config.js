/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = async (env = {}) => {
    const { production, mobile, development } = env;
    const isProduction = production || mobile;
    const isDevelopment = development && !production;

    return {
        entry: {
            app: './src/Main.tsx',
            styles: path.resolve(__dirname, 'assets', 'template', 'styles.css'),
            vendors: ['phaser'],
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        output: {
            filename: ' [name].app.bundle.js',
            path: path.resolve(__dirname, 'dist', 'build'),
        },
        mode: isProduction ? 'production' : 'development',
        devServer: {
            contentBase: path.resolve(__dirname, 'dist'),
            writeToDisk: true,
            open: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].[hash:8].css',
            }),
            new HtmlWebpackPlugin({
                hash: true,
                title: 'Sample game',
                favicon: path.resolve(__dirname, 'assets', 'images', 'favicon.ico'),
                template: path.resolve(__dirname, 'assets', 'template', 'template.html'),
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
};
