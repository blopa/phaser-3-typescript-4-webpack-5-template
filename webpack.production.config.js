/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');

const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = async (env = {}) => {
    return {
        ...baseWebpackConfig,
        mode: 'production',
    };
};
