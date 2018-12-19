const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./common.config');
const globalStyleDirectory = common.appDirectory + '/stylesheet/global';
const extractAppStyle = new ExtractTextPlugin({filename: '[name]-apps.css', allChunks: true});

const page = {
  homePage: [`${common.appDirectory}/apps/HomePage/dev.jsx`]
}

const setting = {
  entry: {
    index: page[`${process.env.page}`]
  },
  output: {
    path: common.builtDirectory,
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: common.appDirectory,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss)$/,
        include: common.appDirectory,
        use: extractAppStyle.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true,
                localIdentName: '[local]--[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [
                  common.appDirectory+'/lib/stylesheet'
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(ttf|woff2|woff|eot|svg)/,
        include: common.appDirectory,
        use: {loader: 'file-loader'}
      }
    ]
  },
  plugins: [
    extractAppStyle,
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    common.definePlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Koa-React',
      template: common.appDirectory + '/index.ejs',
      // globalCss: [`${common.appDirectory}/globalCss/bootstrap.css`, `${common.appDirectory}/globalCss/base.css`],
      globalCss: ['./bootstrap.css', './base.css'],
      inject: false
    })
  ],
  devServer: {
    contentBase: common.builtDirectory,
    port: 3000,
    historyApiFallback: true,
    inline: false,
    hot: true
  }
};
const configs = Object.assign({}, common.baseSetting, setting);
module.exports = configs;
