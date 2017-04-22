var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

var config = {
  entry: './src/index.js',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.elm']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: process.env.NODE_ENV === 'production'
          ? 'elm-webpack-loader?verbose=false&warn=false'
          : ['elm-hot-loader', 'elm-webpack-loader?verbose=true&warn=true']
      }
    ],
    noParse: /\.elm$/
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }])
  ];
  config.output = {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  };
} else {
  config.devtool = 'eval-source-map';
  config.devServer = {
    inline: true,
    stats: {
      colors: true
    }
  };
}

module.exports = config;
