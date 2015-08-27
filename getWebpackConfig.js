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
        },
        { 
          test: /\.css$/,
          loader: 'style-loader!css-loader',
          include: path.join(__dirname, 'src/css')
        },
        {
          test: /\.json$/,
          loaders: ['json']
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader?limit=8192'
        }
      ]
    },
  };

  if (options.environment === 'dev') {
    _.assign(config, {
      devtool: 'eval-cheap-module-source-map',
      entry: [
        'webpack-dev-server/client?http://192.168.1.106:8080',
        'webpack/hot/only-dev-server',
        './src/js/main.js'
      ],
      plugins: [
/*        new webpack.DefinePlugin({
          "process.env": {
            NODE_ENV: JSON.stringify("production")
          }
        }),*/
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
      ],
      module: {
        noParse: [
          /\/sinon.js/
        ],
        loaders: [
          {
            test: /\.js$/,
            loaders: ['react-hot', 'babel?stage=0'],
            include: path.join(__dirname, 'src/js')
          },
          { 
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            include: path.join(__dirname, 'src/css')
          },
          {
            test: /\.json$/,
            loaders: ['json']
          },
          {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
          }
        ]
      },
    });
  }

  else if (options.environment === 'benchmark') {
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