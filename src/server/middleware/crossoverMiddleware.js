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
		// to shoot to the user's browser as an HTML file) we use the
		// client-build babel settings, the client-dev settings are only
		// used for react-hot-loading (which is purely client-side).
		// See .babelrc
		process.env.BABEL_ENV = 'client-build';

		const html = renderToString(
			baseReact(ctx.state.mobx)
		);

		ctx.render('base', {
			html,
			initialState: JSON.stringify(ctx.state.mobx),
		});
	};
}
