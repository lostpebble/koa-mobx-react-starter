import 'babel-polyfill';
import Koa from 'koa';

const app = new Koa();

app.use(async(ctx, next) => {
	const start = new Date();
	await next();
	const ms = new Date() - start;

	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app.use(async(ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.body = { message: err.message };
		ctx.status = err.status || 500;
	}
});

app.use(async ctx => {
	const user = { what: 'The flip' };
	ctx.body = user;
});

app.listen(3000);
