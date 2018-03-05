const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


// webpack configuration setting
module.exports = {
  entry: path.join(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'client', 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // webpack should use babel-loader for js and jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      // wepback should use css-loader to handle css files.
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
      // File loader for image assets
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.NamedModulesPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
