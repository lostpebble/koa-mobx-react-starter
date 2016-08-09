import compose from 'koa-compose';
import mount from 'koa-mount';
import serve from 'koa-static';
import compress from 'koa-compress';
import logger from 'koa-logger';
import favicon from 'koa-favicon';

import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import devConfig from '../../../webpack.config.client';

export function baseErrorHandling() {
	return async (ctx, next) => {
		try {
			await next();
		} catch (err) {
			ctx.body = { message: err.message };
			ctx.status = err.status || 500;
		}
	};
}

export function serverLogging() {
	return logger();
}

export function compressResponse() {
	return compress();
}

export function serveStaticFiles() {
	const staticFolder = mount('/static', serve(`${__dirname}/../static`));
	const distFolder = mount('/dist', serve(`${__dirname}/../../../dist`));
	const fav = favicon(`${__dirname}/../static/favicon/favicon.ico`);

	return compose([fav, staticFolder, distFolder]);
}

export function developmentMiddleware() {
	console.log("Development environment, starting HMR");

	// THIS CAUSES A "vendor.bundle.js:1 Uncaught SyntaxError: Unexpected identifier"
	// ERROR, BUT BETTER THAN THE BROWSER TRYING AND NEVER FINDING THE FILE
	const mockProductionFiles = async(ctx, next) => {
		if (ctx.path === '/dist/vendor.bundle.js' || ctx.path === '/dist/styles.css') {
			ctx.body =
				"Mocked files for development " +
				"(not using separate bundle files for vendor" +
				" and app code in development mode or separate" +
				" files for styles either)";
		} else {
			await next();
		}
	};

	const compile = webpack(devConfig);

	return compose([
		mockProductionFiles,
		devMiddleware(compile, {
			noInfo: true,
			publicPath: devConfig.output.publicPath,
		}),
		hotMiddleware(compile),
	]);
}