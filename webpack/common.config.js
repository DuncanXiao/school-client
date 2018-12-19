const webpack = require('webpack');
const path = require('path');
const appDirectory = path.resolve(__dirname, '../src');
const builtDirectory = path.resolve(__dirname, '../dist');
const configuration = require('config');

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    endpoint: JSON.stringify(configuration.get('tbl.endpoint'))
  }
});

const baseSetting = {
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      Components: appDirectory + '/components',
      Apps: appDirectory + '/apps',
      Utilities: appDirectory + '/utilities',
      Lib: appDirectory + '/lib'
    }
  }
};

module.exports = {
  baseSetting,
  definePlugin,
  appDirectory,
  builtDirectory
};
