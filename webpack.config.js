var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var query = {
  presets: ['es2015', 'react', 'stage-1']
}

module.exports = {

  context: __dirname + '/app',
  entry: {
    javascript: './app.js',
    html: "./index.html" // disable this on when run with server sider rendering
  },

  output: {
    filename: 'app.js',
    path: __dirname + '/dist'
  },

  devtool: 'eval',

  module: {
    loaders: [
      {
        // babel
        test: /\.js/,
        exclude: /node_modules/,
        loaders: ['react-hot','babel-loader?'+JSON.stringify(query)],
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader"
        )
      },
      { test: /\.png$/, loader: "url-loader?limit=100000"},
      { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: "url-loader?limit=100000"},
      { test: /\.(jpg|gif)$/, loader: "file-loader" }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("main.css")
  ]

}
