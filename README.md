# @alifd/next-reset-loader
A webpack loader for injecting @alifd/next/reset.scss and @alifd/theme-pakge/icons.scss to entry jsx file.

[![npm package](https://img.shields.io/npm/v/@alifd/next-reset-loader.svg?style=flat-square)](https://www.npmjs.org/package/next-reset-loader)


## Install

```
npm install next-reset-loader --save-dev
npm install next-theme-loader --save-dev
```

## Usage

### webpack 2+

``` js
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.jsx'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'react',
            'stage-0'
          ],
          plugins: [
            'add-module-exports',
            'transform-decorators-legacy',
            ['babel-plugin-import', { style: true }]
          ]
        }
      }, {
        loader: '@alifd/next-reset-loader',
        options: {
          theme: '@alifd/theme-package', /* icons modified (optional)*/
        },
      }],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [
          'css-loader',
          'fast-sass-loader',
          {
            loader: 'next-reset-loader',
            options: {
              theme: '@alifd/theme-package', /* variables only modified (optional)*/
              modifyVars: {'$css-prefix': 'my-'} /* custom variable (optional) */
            }
          }
        ]
      })
    }]
  }
};
```

## Query

* `theme`(String): get icons.scss from theme package eg: @alifd/theme-1) which come from https://fusion.design
* `base`(String): get reset.scss from base package(default `@alifd/next`)

