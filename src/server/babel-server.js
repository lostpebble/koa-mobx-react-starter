// ensure that for all server imports, we're
// using the server babel settings
process.env.BABEL_ENV = "server";

// Use babel so we can use a higher
// version of JS on the server
require('babel-register');

// Change the default babel promise
// implementation to use bluebird
// (often seen as the best implementation)
require('babel-runtime/core-js/promise').default = require('bluebird');

// Use isomorphic-fetch, which is a fetch
// implementation that works the same on
// server and browser
require('isomorphic-fetch');

// Require our actual server file - which
// will be transformed thanks to babel-register
// above (and according to the .babelrc settings)
require('./server');
