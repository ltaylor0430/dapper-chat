/**
 * @author: @AngularClass
 */

// Look in ./config folder for webpack.dev.js

console.log(process.env.NODE_ENV);
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod');
    break;
  case 'electron':
    module.exports = require('./config/webpack.electron');
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.dev');
}
