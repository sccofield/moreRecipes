const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true,
    publicPath: '/',
    hot: true
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  watch: true
});
