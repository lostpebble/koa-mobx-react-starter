process.env.BABEL_ENV = "server";

require('babel-register');
require('./server');