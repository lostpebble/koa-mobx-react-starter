import compose from 'koa-compose';
import mount from 'koa-mount';
import serve from 'koa-static';
import compress from 'koa-compress';
import logger from 'koa-logger';

import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';
import devConfig from '../../webpack.config.client';

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
	const distFolder = mount('/dist', serve(`${__dirname}/../dist`));

	return compose([staticFolder, distFolder]);
}

export function developmentMiddleware() {
	console.log("Development environment, starting HMR");

	const devConfigBuilt = devConfig({ env: { prod: false } });
	const compile = webpack(devConfigBuilt);

	return compose([
		devMiddleware(compile, {
			noInfo: true,
			publicPath: devConfigBuilt.output.publicPath,
		}),
		hotMiddleware(compile),
	]);
}