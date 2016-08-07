import { renderToString } from 'react-dom/server';

import { baseReact } from '../../crossover/entry';

import { getFreshStores } from '../../crossover/mobx/stores/store-utils';

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

		const html = renderToString(
			baseReact(ctx.state.mobx)
		);

		ctx.render('base', {
			html,
			initialState: JSON.stringify(ctx.state.mobx),
		});
	};
}
