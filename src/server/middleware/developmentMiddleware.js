import compose from 'koa-compose';

import webpack from 'webpack';
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware';

// Need to mock these files for development, because our Pug template
// will be looking for them, but they're actually all bundled up into one
// file during development with webpack and hot reloading
export function mockProductionStaticFiles() {
  return async(ctx, next) => {
    if (ctx.path === '/dist/vendor.bundle.js' || ctx.path === '/dist/styles.css') {
      ctx.body =
        "/*Mocked files for development " +
        "(not using separate bundle files for vendor" +
        " and app code in development mode or separate" +
        " files for styles either)*/";
    } else {
      await next();
    }
  };
}

export function webpackMiddleware() {
  console.log("Development environment, starting HMR");
  const devConfig = require('../../../webpack.config.client');

  const compile = webpack(devConfig);

  return compose([
    devMiddleware(compile, {
      noInfo: true,
      publicPath: devConfig.output.publicPath,
    }),
    hotMiddleware(compile),
  ]);
}
