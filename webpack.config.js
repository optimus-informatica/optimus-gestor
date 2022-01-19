const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const typescript = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
  options: {
    appendTsSuffixTo: [/\.vue$/],
  },
};

const babel = {
  test: /\.(ts|js)x?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
};

const sass = {
  test: /\.s[ac]ss$/i,
  use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
};

const files = {
  test: /\.(png|jpe?g|gif|svg)$/i,
  loader: 'file-loader',
  options: {
    outputPath: 'assets',
    name: '[name].[ext]',
  },
};

const plugins = [
  new htmlWebpackPlugin({
    showErrors: true,
    cache: true,
    template: path.resolve(__dirname, 'app', 'index.html'),
    favicon: './app/favicon.ico',
  }),
  new webpack.DefinePlugin({}),
  new miniCssExtractPlugin({
    filename: 'css/app.css',
  }),
];

module.exports = {
  entry: ['./app/index.ts', './app/scss/optimus/index.scss'],
  output: {
    filename: 'js/app.js',
    cssFilename: 'app.css',
    path: path.resolve(__dirname, 'app', 'public'),
  },
  module: {
    rules: [babel, sass, typescript, files],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.vue', '.scss'],
    alias: { '@': path.resolve(__dirname, 'app', 'src') },
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins,
};
