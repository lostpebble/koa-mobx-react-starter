import { renderToString } from 'react-dom/server';

import { baseReact } from '../../crossover/entry';
import { getFreshStores } from '../../crossover/mobx/store-utils';

export function injectState() {
	return async (ctx, next) => {
		console.log("Injecting (MobX) state into current request/response context");

		ctx.state.mobx = getFreshStores();

		await next();
	};
}

export function renderReact() {
	return async (ctx) => {
		console.log("Rendering React with state");

		// For server rendering (building the page for the first time
		// to shoot to the user's browser as an HTML file) we must use
		// either client-build (for production) or client-dev (for including
		// react-hot-reloading) as our babel environment variable.
		// see .babelrc
		process.env.BABEL_ENV = process.env.NODE_ENV === 'production' ? 'client-build' : 'client-dev';

		const html = renderToString(
			baseReact(ctx.state.mobx)
		);

		ctx.render('base', {
			html,
			initialState: JSON.stringify(ctx.state.mobx),
		});
	};
}
