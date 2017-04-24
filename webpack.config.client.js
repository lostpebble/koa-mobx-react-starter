const { join } = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const prod = process.env.NODE_ENV === "production";
console.log(`Compiling client code with production set to "${prod}"`);

module.exports = {
  entry: !prod ? (
    {
      bundle: ['webpack-hot-middleware/client', 'isomorphic-fetch', 'regenerator-runtime/runtime', join(__dirname, './src/utils/polyfills.js'), join(__dirname, './src/crossover/entry.js')],
    }
  ) : (
    {
      bundle: [join(__dirname, './src/utils/polyfills.js'), 'isomorphic-fetch', 'regenerator-runtime/runtime', './src/crossover/entry.js'],
      vendor: ['react', 'react-dom'],
    }
  ),
  target: 'web',
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    pathinfo: !prod,
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
        loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
              quality: 80,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.s?css/,
        loader: prod ? (
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: [
              'css-loader',
              'postcss-loader',
              'sass-loader',
            ],
          })
        ) : (
          'style-loader!css-loader!postcss-loader!sass-loader'
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
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Opera >= 12', 'Chrome >= 25', 'Firefox >= 13', 'ie >= 9'] })],
      },
    }),
  ]) : ([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: true,
      screw_ie8: true,
      compress: {
        warnings: false,
        drop_console: true,
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
};

//postcss: [autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Opera >= 12', 'Chrome >= 25', 'Firefox >= 13', 'ie >= 9'] })],
