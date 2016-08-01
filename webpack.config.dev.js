const { resolve } = require('path');

const webpack = require('webpack');

module.exports = (env) => ({
  context: resolve(__dirname, './client'),
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './entry.js',
  ],
  target: 'web',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, './dist'),
    pathInfo: !env.prod,
    publicPath: '/static/',
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
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});
