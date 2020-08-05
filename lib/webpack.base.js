const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugin = [];
  const projectRoot = process.cwd();
  const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
  /* [
   'F:/newXM/new/webpack2/src/index/index.js',
   'F:/newXM/new/webpack2/src/search/index.js'
   ] */
  // console.log(entryFiles);
  Object.keys(entryFiles).map((index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    // console.log(pageName);
    entry[pageName] = entryFile;

    return htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });
  return {
    entry,
    htmlWebpackPlugin,
  };
};

const { entry, htmlWebpackPlugin } = setMPA();
module.exports = {
  entry,
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /.css$/,
        use: [
        // 'style-loader',
        // css文件指纹，把样式全部提取出来与style-loader相冲突，所以注释掉style-loader
          MiniCssExtractPlugin.loader,
          'css-loader',
        ], // 链式调用 执行顺序是从右到左 css~再style~
      },
      {
        test: /.less$/,
        use: [
        // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
          // 自动补全
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  overrideBrowserslist: ['last 2 version', '>1%', 'ios 7'],
                }),
              ],
            },
          },
          {
            loader: 'px2rem-loader',
            options: {
              remUnit: 75,
              remPrecesion: 8,
            },
          },
        ], // 链式调用 执行顺序是从右到左 先less~再css~再style~
      },
      // {
      //   test: /.(png|jpg|gif|jpeg)$/,
      //   use: [
      //       {loader: 'url-loader',
      //       options: {
      //       limit: 10240  // 如果小于这个数值内联
      //       }}
      //     ]
      // }
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
    // css文件指纹 把样式全部提取出来
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
    // 错误显示，捕获，更换抛出error code的值
    function doneErrorPlugin() {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
          // console.log('build error');
          process.exit(1);
        }
      });
    },
    new CleanWebpackPlugin(),
  ].concat(htmlWebpackPlugin),
};
