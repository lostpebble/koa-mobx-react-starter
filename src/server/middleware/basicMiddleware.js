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

const oneHour = 1000 * 60 * 60;
const oneDay = oneHour * 24;

export function serveStaticFiles() {
  const staticFolder = mount('/static', serve(`static`));
  const distFolder = mount('/dist', serve(`dist`));
  const favicons = serve(`static/favicon`, { maxage: oneDay * 2 });

  return compose([favicons, staticFolder, distFolder]);
}
