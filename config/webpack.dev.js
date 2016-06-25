var webpack = require('webpack'),
    path = require('path');


function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat('../').concat(args));
}

module.exports = {

  devtool: 'sourcemap',
  resolve: {
    // Make sure root is src
   // remove other default values
    modulesDirectories: ['node_modules'],
    extensions: ['', '.ts', '.styl','.js', '.html']
  },

  output: {
    path:root('./'),
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map-loader', exclude: [ root('node_modules/rxjs'),root('node_modules/jeet') ] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },
      { test: /\.(html|css)$/, loader: 'raw-loader' },
      { test: /\.styl$/, loader: 'css-to-string!css!stylus'},

    ]
  },
  stylus: {
    use: [require('jeet')(), require('rupture')(), require('nib')()]
  },
   node: {
    global: 'window',
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }

};
