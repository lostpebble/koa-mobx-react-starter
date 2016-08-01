import 'babel-polyfill';

import Koa from 'koa';
import Pug from 'koa-pug';
// import KoaStatic from 'koa-static';

import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import devConfig from '../webpack.config.dev';

import { baseErrorHandling, serverResponseTimeLogging } from './middleware/basicMiddleware';

const app = new Koa();

app.use(serverResponseTimeLogging);
app.use(baseErrorHandling);

// DEVELOPMENT STUFF
if (process.env.NODE_ENV === 'development') {
	console.log("Development environment, starting HMR");

	const devConfigBuilt = devConfig({ env: { prod: false } });

	const compile = webpack(devConfigBuilt);

	app.use(devMiddleware(compile, {
		noInfo: true,
		publicPath: devConfigBuilt.output.publicPath,
	}));

	app.use(hotMiddleware(compile));
} else {
	console.log("Production environment");
}

const pug = new Pug({
	viewPath: './server/views',
});

pug.use(app);

app.use(async ctx => {
	ctx.render('base', {
		initialState: {
			what: "what",
    },
  });
});

app.listen(3000);
console.log('Server listening on port 3000');
