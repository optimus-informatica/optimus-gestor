const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// const miniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const typescript = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  exclude: /node_modules/,
  options: {
    appendTsSuffixTo: [/\.vue$/],
  },
};

const babel = {
  test: /\.(js)x?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
};

const sass = {
  test: /\.s[ac]ss$/i,
  use: [
    // miniCssExtractPlugin.loader,
    'style-loader',
    'css-loader',
    { loader: 'sass-loader', options: { sourceMap: true } },
  ],
};

const files = {
  test: /\.(png|jpe?g|gif)$/i,
  loader: 'file-loader',
  options: {
    outputPath: 'assets',
    name: '[name].[ext]',
  },
};

const vue = {
  test: /\.vue$/i,
  use: 'vue-loader',
};

const plugins = [
  new htmlWebpackPlugin({
    showErrors: true,
    cache: true,
    template: path.resolve(__dirname, 'app', 'index.html'),
    favicon: './app/favicon.ico',
  }),
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: true,
  }),
  // new miniCssExtractPlugin({
  //   filename: 'css/app.css',
  // }),
];

module.exports = {
  entry: ['./app/index.ts', './app/scss/optimus/index.scss'],
  output: {
    filename: 'js/app.js',
    cssFilename: 'app.css',
    path: path.resolve(__dirname, 'app', 'public'),
  },
  module: {
    rules: [babel, sass, typescript, files, vue],
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
  devtool: 'source-map',
  plugins,
};
