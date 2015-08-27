var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');

module.exports = function(options) {
  var config = {
    entry: [
      './src/js/main.js'
    ],
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'app.js',
      publicPath: '/'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin()
    ],
    resolve: {
      extensions: ['', '.js'],
      modulesDirectories: ['src', 'node_modules']
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel?stage=0'],
          include: path.join(__dirname, 'src/js')
        }
      ]
    },
  };

  if (options.environment === 'benchmark') {
    _.assign(config, {
      devtool: 'eval-cheap-module-source-map',
      output: {
        path: path.join(__dirname, 'build/benchmark'),
        filename: 'benchmark.js',
        publicPath: '/'
      },
      entry: [
        './benchmarks.webpack.js'
      ],
      plugins: [

      ],
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: ['babel?stage=0'],
            include: path.join(__dirname, 'src/js')
          },
        ]
      },
    });
  }

  return config;
};