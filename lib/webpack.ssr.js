const { merge } = require('webpack-merge');
const cssnano = require('cssnano');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const ssrConfig = {
  mode: 'production',
  rules: [
    {
      test: /\.css$/,
      use: 'ignore-loader',
    },
    {
      test: /\.less$/,
      use: 'ignore-loader',
    },
  ],
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://now8.gtimg.com/now/lib/16.2.0/react.min.js',
          global: 'React',
        },
      ],
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react-dom',
          entry: 'https://now8.gtimg.com/now/lib/16.2.0/react-dom.min.js',
          global: 'ReactDOM',
        },
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 30,
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
};
module.exports = merge(baseConfig, ssrConfig);
