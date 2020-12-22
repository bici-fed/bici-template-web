// craco is tool which is same to "custom-cra",
// we use craco to override the default behavior and configuration of "create-react-app".

'use strict';

const path = require('path');

const CracoLessPlugin = require('craco-less');

const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

// cover the ant design theme if need,
// each modify var start with the character "@"
const modifyVars = {
  '@primary-color': '#1890ff',
};

// babel-plugin-import is a modular import plugin for babel,
// compatible with antd, antd-mobile, lodash, material-ui, and so on.
const babelImportConfig = { libraryName: 'antd', libraryDirectory: 'es', style: true };

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    plugins: [new AntdDayjsWebpackPlugin()],
  },
  babel: {
    presets: [],
    plugins: [['import', babelImportConfig]],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars,
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
