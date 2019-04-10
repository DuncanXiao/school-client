const webpack = require('webpack');
const path = require('path');
const appDirectory = path.resolve(__dirname, '../src');
const builtDirectory = path.resolve(__dirname, '../dist');
const configuration = require('config');

const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    DOMAIN: JSON.stringify(configuration.get('domain')),
    APIHOST: JSON.stringify(configuration.get('apiHost'))
  }
});

const baseSetting = {
  node: {
    fs: 'empty'
  },
  resolve: {
    enforceExtension: false,
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      Components: `${appDirectory}/components`,
      Apps: `${appDirectory}/apps`,
      Utilities: `${appDirectory}/utilities`,
      Lib: `${appDirectory}/lib`,
      Feature: `${appDirectory}/feature`,
      Statics: `${appDirectory}/statics`
    }
  }
};

module.exports = {
  baseSetting,
  definePlugin,
  appDirectory,
  builtDirectory
};
