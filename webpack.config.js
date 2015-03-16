var webpack = require("webpack");
var path = require("path");

module.exports = {
  port: 8080,

  devtool: "inline-source-map",
  entry: [
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/dev-server",
    "./js/app"
  ],
  output: {
    path: path.join(__dirname, "/js"),
    filename: "bundle.js",
    publicPath: "/js/"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css", exclude: /node_modules/ },
      { test: /\.js$/, loaders: ["react-hot", "babel-loader"], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ["", ".js"]
  }
};
