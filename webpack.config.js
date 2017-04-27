const path = require('path')
const webpack = require('webpack')
const isProd = process.env.NODE_ENV === 'production'

const config = {
  resolve: {
    extensions: ['.js', '.vue']
  },
  entry: {
    'vue-jpeg-auto-rotation': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProd ? '[name].min.js' : '[name].js',
    library: 'JpegAutoRotation',
    libraryTarget: "umd"
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : [],
  module: {
    rules: [{
      test: /.(js|vue)$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: path.resolve(__dirname, 'src')
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      include: [
        path.resolve(__dirname, "src")
      ]
    }]
  }
}

module.exports = config
