const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// webpack configuration setting
module.exports = {
  entry: path.join(__dirname, 'client', 'src', 'index.jsx'),
  output: {
    path: path.join(__dirname, 'client', 'public'),
    filename: 'bundle.js'
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
  ],
  devServer: {
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
