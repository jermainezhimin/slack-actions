const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  target: 'node',
  devtool: 'inline-source-map',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
