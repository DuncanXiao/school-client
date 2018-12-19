const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./common.config');
const extractAppStyle = new ExtractTextPlugin({filename: '[name].css'});
const extractPluginStyle = new ExtractTextPlugin({filename: '[name]-plugin.css'});
const appDirectory = common.appDirectory;
const pluginCssPath = `${appDirectory}/lib/plugin-css`;

const pages = {
  'open_gallery/home_page': [`${appDirectory}/apps/OpenGallery/HomePage/prod.jsx`]
}

const setting = {
  entry: pages,
  output: {
    path: path.resolve(__dirname, '../prod'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: appDirectory,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss)$/,
        include: appDirectory,
        exclude: pluginCssPath,
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
                  appDirectory+'/lib/stylesheet'
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(css)$/,
        include: pluginCssPath,
        use: extractPluginStyle.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                camelCase: true
              }
            }
          ]
        })
      },
      {
        test: /\.(ttf|woff2|woff|eot|svg)/,
        include: appDirectory,
        use: {loader: 'file-loader'}
      }
    ]
  },
  plugins: [
    extractAppStyle,
    extractPluginStyle,
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom'
    }),
    common.definePlugin
  ]
};
const configs = Object.assign({}, common.baseSetting, setting);
module.exports = configs;
