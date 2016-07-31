'use strict';

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaPug = require('koa-pug');

var _koaPug2 = _interopRequireDefault(_koaPug);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _koaWebpackMiddleware = require('koa-webpack-middleware');

var _webpackConfig = require('../webpack.config.dev');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var app = new _koa2.default();

// DEVELOPMENT STUFF
if (process.env.NODE_ENV === 'development') {
		console.log("Development environment, starting HMR");

		var devConfigBuilt = (0, _webpackConfig2.default)({ env: { prod: false } });

		var compile = (0, _webpack2.default)(devConfigBuilt);

		app.use((0, _koaWebpackMiddleware.devMiddleware)(compile, {
				noInfo: true,
				publicPath: devConfigBuilt.output.publicPath
		}));

		app.use((0, _koaWebpackMiddleware.hotMiddleware)(compile, {}));
} else {
		console.log("Production environment");
}

// basic method for measuring request lengths
app.use(function () {
		var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
				var start, ms;
				return regeneratorRuntime.wrap(function _callee$(_context) {
						while (1) {
								switch (_context.prev = _context.next) {
										case 0:
												start = new Date();
												_context.next = 3;
												return next();

										case 3:
												ms = new Date() - start;


												console.log(ctx.method + ' ' + ctx.url + ' - ' + ms);

										case 5:
										case 'end':
												return _context.stop();
								}
						}
				}, _callee, undefined);
		}));

		return function (_x, _x2) {
				return _ref.apply(this, arguments);
		};
}());

app.use(function () {
		var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(ctx, next) {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
						while (1) {
								switch (_context2.prev = _context2.next) {
										case 0:
												_context2.prev = 0;
												_context2.next = 3;
												return next();

										case 3:
												_context2.next = 9;
												break;

										case 5:
												_context2.prev = 5;
												_context2.t0 = _context2['catch'](0);

												ctx.body = { message: _context2.t0.message };
												ctx.status = _context2.t0.status || 500;

										case 9:
										case 'end':
												return _context2.stop();
								}
						}
				}, _callee2, undefined, [[0, 5]]);
		}));

		return function (_x3, _x4) {
				return _ref2.apply(this, arguments);
		};
}());

var pug = new _koaPug2.default({
		viewPath: './server/views'
});

pug.use(app);

app.use(function () {
		var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(ctx) {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
						while (1) {
								switch (_context3.prev = _context3.next) {
										case 0:
												ctx.render('base', {
														initialState: {
																what: "what"
														}
												});

										case 1:
										case 'end':
												return _context3.stop();
								}
						}
				}, _callee3, undefined);
		}));

		return function (_x5) {
				return _ref3.apply(this, arguments);
		};
}());

app.listen(3000);
console.log('Server listening on port 3000');

//# sourceMappingURL=server-compiled.js.map