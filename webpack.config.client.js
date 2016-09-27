const { join } = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const prod = process.env.NODE_ENV === "production";
console.log(`Compiling client code with production set to "${prod}"`);

module.exports = {
  entry: !prod ? (
    ['webpack-hot-middleware/client', 'isomorphic-fetch', 'regenerator-runtime/runtime', join(__dirname, './src/utils/polyfills.js'), join(__dirname, './src/crossover/entry.js')]
  ) : (
  {
    js: [join(__dirname, './src/utils/polyfills.js'), 'isomorphic-fetch', 'regenerator-runtime/runtime', './src/crossover/entry.js'],
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
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file?context=src/images&name=images/[path][name].[ext]', 'image-webpack?optimizationLevel=2'],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.scss/,
        loader: prod ? (
          ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
        ) : (
          'style!css!postcss!sass'
        ),
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
    new ExtractTextPlugin("styles.css"),
  ]) : ([
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
    new webpack.optimize.DedupePlugin(),
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
        APP_ENV: JSON.stringify('browser'),
      },
    }),
    new ExtractTextPlugin("styles.css"),
  ]),
  postcss: [autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Opera >= 12', 'Chrome >= 25', 'Firefox >= 13', 'ie >= 9'] })],
};
