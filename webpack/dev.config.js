const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./common.config');
const extractAppStyle = new ExtractTextPlugin({filename: '[name]-apps.css', allChunks: true});
const extractPluginStyle = new ExtractTextPlugin({filename: '[name]-plugin.css', allChunks: true});
const appDirectory = common.appDirectory;
const pluginCssPath = `${appDirectory}/lib/plugin-css`;

const page = {
  homePage: [`${appDirectory}/apps/OpenGallery/HomePage/dev.jsx`]
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
        include: appDirectory,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(scss)|.(css)$/,
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
    extractPluginStyle,
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
      template: appDirectory + '/index.ejs',
      pluginCss: '[name]-plugin.css',
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
