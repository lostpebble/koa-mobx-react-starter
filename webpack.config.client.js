const { join } = require('path');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === "production";
console.log(`Compiling client code with production set (${prod})`);

module.exports = {
	entry: !prod ? (
		['webpack-hot-middleware/client', './src/crossover/entry.js']
	) : (
	{
		js: './src/crossover/entry.js',
		vendor: ['react', 'react-dom'],
	}
	),
	target: 'web',
	output: {
		path: join(__dirname, 'dist'),
		filename: 'bundle.js',
		pathInfo: !prod,
		publicPath: '/dist/',
	},
	devtool: prod ? 'source-map' : 'eval',
	module: {
		loaders: [prod ?
			{
				test: /\.(jsx?)$/,
				exclude: /node_modules/,
				loaders: [
					'babel-loader',
				],
			} : {
				test: /\.(jsx?)$/,
				loader: 'babel',
				exclude: /node_modules/,
				include: __dirname,
				query: {
					presets: ['react-hmre']
				}
			},
		],
	},
	plugins: !prod ? ([
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				BABEL_ENV: JSON.stringify('client'),
			},
		}),
	]) : ([
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.bundle.js',
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
			sourceMap: false,
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
				BABEL_ENV: JSON.stringify('client-build'),
			},
		}),
	]),
}
