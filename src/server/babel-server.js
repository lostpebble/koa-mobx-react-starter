process.env.BABEL_ENV = "server";

require('babel-register');
require('babel-runtime/core-js/promise').default = require('bluebird');
require('./server');
