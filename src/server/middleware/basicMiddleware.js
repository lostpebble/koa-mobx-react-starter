import compose from 'koa-compose';
import mount from 'koa-mount';
import serve from 'koa-static';
import compress from 'koa-compress';
import logger from 'koa-logger';
import favicon from 'koa-favicon';

export function baseErrorHandling() {
  return async(ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.error(`BASE ERROR HANDLING: ${err.name} : ${err.message}`);
      ctx.body = { name: err.name, message: err.message, stack: err.stack };
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
