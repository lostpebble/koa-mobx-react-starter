import 'babel-polyfill';

import Koa from 'koa';
import Pug from 'koa-pug';
import router from './router';

import {
	serverLogging,
	baseErrorHandling,
	serveStaticFiles,
	developmentMiddleware,
	compressResponse,
} from './middleware/basicMiddleware';

import {
	injectState,
	renderReact,
} from './middleware/crossoverMiddleware';

// check for production, mainly used to disable
// compression for webpack hot reloading to work
const prod = process.env.NODE_ENV !== 'development';

const app = new Koa();

const pug = new Pug({ viewPath: './src/server/views' });
pug.use(app);

// DEVELOPMENT STUFF
if (process.env.NODE_ENV === 'development') {
	process.env.BABEL_ENV = 'client-dev';
	app.use(developmentMiddleware());
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
