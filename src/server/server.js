import 'babel-polyfill';

import Koa from 'koa';
import router from './router';

import {
  serverLogging,
  baseErrorHandling,
  serveStaticFiles,
  compressResponse,
} from './middleware/basicMiddleware';

import {
  webpackMiddleware,
  mockProductionStaticFiles,
} from './middleware/developmentMiddleware';

import {
  injectState,
  renderReact,
} from './middleware/crossoverMiddleware';

// check for production, mainly used to disable
// compression for webpack hot reloading to work
// and enable hot reloading itself
const prod = process.env.NODE_ENV !== 'development';

const app = new Koa();

// Development stuff (enable Webpack hot reloading)
if (!prod) {
  // Ensure that for building the client code,
  // we're using the client babel settings
  process.env.BABEL_ENV = 'client-dev';

  app.use(mockProductionStaticFiles());
  app.use(webpackMiddleware());
} else {
  console.log("Production environment");
}

app.use(serverLogging());
app.use(baseErrorHandling());
if (prod) app.use(compressResponse());
app.use(serveStaticFiles());
app.use(injectState());
app.use(router.routes());
app.use(renderReact());

const server = app.listen(3000);
console.log('Server listening on %s:%s', server.address().address, server.address().port);
