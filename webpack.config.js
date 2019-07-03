const path = require('path')

module.exports = {
  entry: {
    bundle: path.join(__dirname, './src/index.ts'),
  },

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'lib'),
    library: 'ParserWorker',
    libraryTarget: 'umd',
  },

  mode: process.env.NODE_ENV || 'production',

  watchOptions: {
    ignored: /node_modules|dist|\.js/g,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [],
  },

  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        loader: 'worker-loader',
        options: { publicPath: '/workers/' }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      }
    ],
  },
}