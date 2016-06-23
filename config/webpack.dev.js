var webpack = require('webpack'),
    path = require('path');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

module.exports = {
 /* entry: {
          main: root('client/app/electron/main.ts'),
  },*/
  devtool: 'source-map',
  debug: true,
  watch: false,
  resolve: {
    extensions: ['', '.ts', '.js', '.html']
  },
  output: {
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader', exclude: [ root('node_modules/rxjs') ] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },
      { test: /\.(html|css)$/, loader: 'raw-loader' }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
};
