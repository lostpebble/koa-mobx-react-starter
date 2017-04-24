// Enable require functionality for
// Marko templates
require('marko/node-require').install();

// Use isomorphic-fetch, which is a fetch
// implementation that works the same on
// server and browser
require('isomorphic-fetch');

// Require our actual server file - which
// will be transformed thanks to babel-register
// above (and according to the .babelrc settings)
require('./server');
