import express from 'express';
import morgan from 'morgan';

import { renderToString } from 'react-dom/server';
import { baseReact } from '../crossover/entry';

const app = express();

app.use(morgan('combined'));

if (process.env.NODE_ENV === "development") {
	console.log("development environment, starting HMR");

	const webpack = require('webpack');
	const config = require('../../webpack.config.client');

	const compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));
}

app.get('/*', (req, res) => {
	const html = renderToString(
		baseReact()
	);

	res.render('base', {
		html,
		initialState: {
			what: "what",
		},
	});
});

app.set('views', './src/server/views');
app.set('view engine', 'pug');

const server = app.listen(3000, () => {
	console.log(`App listening at ${server.address().address}:${server.address().port}`);
})