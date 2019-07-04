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

  mode: process.env.NODE_ENV || 'development',

  watchOptions: {
    ignored: /node_modules|lib|\.js/g,
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
        options: {
          inline: true,
          name: 'parser.worker.js'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      }
    ],
  },
}