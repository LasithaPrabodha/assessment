const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const publicPath = path.join(__dirname, 'public');
const buildPath = path.join(__dirname, 'build');
const env = process.env.NODE_ENV || 'development';

module.exports = {
  devtool: 'source-map',
  target: 'web',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: buildPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body'
    }),
    new ExtractTextPlugin('style.bundle.css')
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: path.resolve(__dirname, 'src'),
      use: [{
        loader: 'babel-loader'
      }]
    },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    proxy:{
      '/api': 'http://localhost:3000'
    }
  }
};
