const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./common.config');
const extractAppStyle = new ExtractTextPlugin({filename: '[name]-apps.css', allChunks: true});
const extractPluginStyle = new ExtractTextPlugin({filename: '[name]-plugin.css', allChunks: true});
const extractLessStyle = new ExtractTextPlugin({filename: '[name]-less.css', allChunks: true});
const appDirectory = common.appDirectory;

const postcssOpts = {
  ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
  plugins: () => [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    // pxtorem({ rootValue: 100, propWhiteList: [] })
  ],
};

const page = {
  studentProfile: [`${appDirectory}/apps/Student/ProfilePage/dev.js`],
  studentSignUp: [`${appDirectory}/apps/Student/SignUpPage/dev.js`],
  studentSignIn: [`${appDirectory}/apps/Student/SignInPage/dev.js`]
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
        test: /\.(scss)$/,
        include: appDirectory,
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
        test: /\.less$/i,
        use: extractLessStyle.extract({
          fallback: 'style-loader',
          use: [
            'css-loader', { loader: 'postcss-loader', options: postcssOpts }, 'less-loader'
          ]
        })
      },
      {
        test: /\.(css)$/,
        use: extractPluginStyle.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              // options: {
              //   modules: true,
              //   camelCase: true
              // }
            }
          ]
        })
      },
      {
        test: /\.(svg)$/i,
        use: [{
          loader: 'svg-sprite-loader'
        }]
      },
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

console.log(configs);

module.exports = configs;
