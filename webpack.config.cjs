const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './index.js',  // Replace with your actual entry file
  target: 'node',  // Bundle for Node.js environment
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'  // Output format compatible with Node.js
  },
  resolve: {
    extensions: ['.js'],  // Automatically resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Transpile modern JavaScript
        }
      }
    ]
  },
  mode: 'production',  // Optimize for production
  optimization: {
    minimize: true,  // Minify the bundle
  }
};
