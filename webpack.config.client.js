const { join } = require('path');
const webpack = require('webpack');

module.exports = (env) => ({
  entry: !env.prod ? (
    ['react-hot-loader/patch', 'webpack-hot-middleware/client', './client/entry.js']
  ) : (
    ['./client/entry.js']
  ),
  target: 'web',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
    pathInfo: !env.prod,
    publicPath: '/dist/',
  },
  devtool: env.prod ? 'source-map' : 'eval',
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: env.prod ? JSON.stringify('production') : JSON.stringify('development'),
        BABEL_ENV: JSON.stringify('client'),
      },
    }),
  ],
});
