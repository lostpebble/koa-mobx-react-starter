export async function baseErrorHandling(ctx, next) {
	try {
		await next();
	} catch (err) {
		ctx.body = { message: err.message };
		ctx.status = err.status || 500;
	}
}

export async function serverResponseTimeLogging(ctx, next) {
	const start = new Date();
	await next();
	const ms = new Date() - start;

	console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
