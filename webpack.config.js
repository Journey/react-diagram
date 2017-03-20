new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
}),
module.exports = {
  // configuration
  context: __dirname,
  entry:"./app/js/index.js",
  output:{
    path:__dirname + "/dist",
    filename:"diagram.js"
  },
  module: {
    loaders: [
      {
	test: /\.jsx?$/,
	exclude: /(node_modules|bower_components|libs)/,
	loader: 'babel' // 'babel-loader' is also a legal name to reference
      },
      {
	test: /\.js?$/,
	exclude: /(node_modules|bower_components|libs)/,
	loader: 'babel' // 'babel-loader' is also a legal name to reference
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.jpg$/, loader: "url-loader?limit=100000" },
      { test: /\.png$/, loader: "file-loader" }
    ]
  }
};

