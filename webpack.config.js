module.exports = {
  devtool: 'source-map',
  entry: "./app/index.js",
  output: {
    filename: "./public/bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
