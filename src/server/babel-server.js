// ensure that for all server imports, we're
// using the server babel settings
process.env.BABEL_ENV = "server";

require('babel-register');
require('babel-runtime/core-js/promise').default = require('bluebird');
require('isomorphic-fetch');
require('./server');
