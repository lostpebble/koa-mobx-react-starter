import React from 'react';
import { renderToString } from 'react-dom/server';
import baseReact from '../../client/baseReact';

export function renderReact() {
	return async (ctx) => {
		const html = renderToString(baseReact());

		ctx.render('base', {
			html,
			initialState: {
				what: "what",
			},
		});
	};
}
