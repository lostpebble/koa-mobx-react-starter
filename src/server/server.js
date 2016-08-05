import 'babel-polyfill';

import Koa from 'koa';
import Pug from 'koa-pug';
import route from 'koa-route';

import {
	serverLogging,
	baseErrorHandling,
	serveStaticFiles,
	developmentMiddleware,
	compressResponse,
} from './middleware/basicMiddleware';

import {
	renderReact,
} from './middleware/crossoverMiddleware';

const prod = process.env.NODE_ENV !== 'development';

const app = new Koa();

const pug = new Pug({ viewPath: './src/server/views' });
pug.use(app);

app.use(serverLogging());
app.use(baseErrorHandling());
// if (prod) app.use(compressResponse());
app.use(serveStaticFiles());
app.use(route.get('/', renderReact()));

// DEVELOPMENT STUFF
if (process.env.NODE_ENV === 'development') {
	process.env.BABEL_ENV = 'client';
	app.use(developmentMiddleware());
} else {
	console.log("Production environment");
}

const server = app.listen(3000);
console.log('Server listening on %s:%s', server.address().address, server.address().port);
