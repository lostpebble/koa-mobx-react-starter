const { join } = require('path');
const webpack = require('webpack');

const prod = process.env.NODE_ENV === "production";
console.log(`Compiling client code with production set (${prod})`);

module.exports = {
	entry: !prod ? (
		['webpack-hot-middleware/client', join(__dirname, './src/crossover/entry.js')]
	) : (
	{
		js: ['./src/crossover/entry.js'],
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
		loaders: [
			{
				test: /\.(jsx?)$/,
				exclude: /node_modules/,
				loaders: [
					'babel-loader',
				],
			},
		],
	},
	plugins: !prod ? ([
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				BABEL_ENV: JSON.stringify('client-dev'),
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
