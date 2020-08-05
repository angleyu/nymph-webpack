const { merge } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');

const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
};
module.exports = merge(baseConfig, devConfig);
