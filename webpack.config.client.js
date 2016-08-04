const { join } = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  console.log("Compiling client code with env set", env);

  return ({
    entry: !env.prod ? (
      ['react-hot-loader/patch', 'webpack-hot-middleware/client', './src/crossover/entry.js']
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
    plugins: !env.prod ? ([
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
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: true,
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
  });
};
