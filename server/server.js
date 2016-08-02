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

const app = new Koa();

const pug = new Pug({ viewPath: './server/views' });
pug.use(app);

app.use(serverLogging());
app.use(baseErrorHandling());
app.use(compressResponse());
app.use(serveStaticFiles());

app.use(route.get('/', renderReact()));

/*
 async ctx => {
 console.log("Rendering base page");

 ctx.render('base', {
 initialState: {
 what: "what",
 },
 });
 })
*/

app.use(route.get('/static/(.*)', async () => {
	console.log("Rendering nothing, checking downstream");
}));

// DEVELOPMENT STUFF
if (process.env.NODE_ENV === 'development') {
	app.use(developmentMiddleware());
} else {
	console.log("Production environment");
}

const server = app.listen(3000);
console.log('Server listening on %s:%s', server.address().address, server.address().port);
