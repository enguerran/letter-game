var webpack = require('webpack');

module.exports = {
  port: 8080,
  debug: true,
  watch: true,
  colors: true,

  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './js/app'
  ],
  output: {
    path: __dirname + '/js',
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css", exclude: /node_modules/ },
      { test: /\.js$/, loaders: ["react-hot", "jsx"], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  }
};
