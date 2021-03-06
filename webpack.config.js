'use strict';
// Modules
const path = require('path');
var APP_PATH = path.resolve(__dirname, 'src');
const webpack = require('webpack');
const helpers = require('./webpack/helpers');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


// set the environment by npm lifecycle event , `npm run build` npm_lifecycle_event is build
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test';
const isProd = ENV === 'build' || ENV === 'build:mini';

module.exports = function () {
	const config = {
		context: helpers.root('./src'),

		entry: {
			'vendor': [
				'angular-touch',
				'angular-sortable-view',
				'lib-flexible'
			],
			'app': './app.js',
			'index2': './index2.js'
		},
		output: {
			path: helpers.root('./dist'),
			publicPath: isProd ? './' : '/',
			filename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js',
			chunkFilename: isProd ? '[name].chunk.[chunkhash].js' : '[name].chunk.js'
		},
		externals: {
			jquery: 'jQuery',
			angular: 'angular',
			uiRouter: 'angular-ui-router',
			uiBootstrap: 'angular-ui-bootstrap'
		},
		/*
		 * Options affecting the normal modules.
		 * See: http://webpack.github.io/docs/configuration.html#module
		 */
		module: {

			/*
			 * An array of automatically applied loaders.
			 *
			 * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
			 * This means they are not resolved relative to the configuration file.
			 *
			 * See: http://webpack.github.io/docs/configuration.html#module-loaders
			 */
			loaders: [
				// JS LOADER
				// Reference: https://github.com/babel/babel-loader
				// Compiles ES6 and ES7 into ES5 code
				{
					test: /\.js$/, 
					loaders: ['babel'], 
					exclude: /node_modules/
				},
				/*
				 * Reference https://github.com/webpack/less-loader
				 */
				{
					test: /\.less$/,
					loader: ExtractTextPlugin.extract('css!postcss!less')
				},

				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('css!postcss')
				},

				// HTML LOADER
				// Reference: https://github.com/webpack/html-loader
				// Allow loading html through js
				{
					test: /\.html$/, 
					loader: 'html?root=/&attrs=img:src img:data-src link:href'
				},

				// FILE LOADER
				// Reference: https://github.com/webpack/file-loader
				// Copy resource files to output
				{
					test: /\.(png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/i,
					loader: 'file?name=images/[name].[ext]?[hash]'
				},
			]

		},

		/**
		 * Plugins
		 * Reference: http://webpack.github.io/docs/configuration.html#plugins
		 * List: http://webpack.github.io/docs/list-of-plugins.html
		 */
		plugins: [
			// add user defined string when cli
			new webpack.DefinePlugin({
				__PRO_ENV__: JSON.parse(JSON.stringify(process.env.NODE_ENV))
			}),
			//自定义的公共模块(单页面不需要)
			new webpack.optimize.CommonsChunkPlugin({
				name: 'commons.chunk',
				chunks: ['app', 'index2']
			}),
			// vendor:第三方库, runtime:webpack运行文件
			new webpack.optimize.CommonsChunkPlugin({
				name: ['vendor', 'runtime'],
				filename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js',
				minChunks: Infinity
			}),
			
			// Reference: https://github.com/ampedandwired/html-webpack-plugin
			// Render index.html
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: helpers.root('./src/index.html'),
				favicon: helpers.root('./favicon.ico'),
				chunks: ['runtime', 'vendor', 'commons.chunk', 'app'],
				chunksSortMode: 'dependency'
			}),
			// Render index2.html
			new HtmlWebpackPlugin({
				filename: 'index2.html',
				template: helpers.root('./src/index2.html'),
				favicon: helpers.root('./favicon.ico'),
				chunks: ['runtime', 'vendor', 'commons.chunk', 'index2'],
				chunksSortMode: 'dependency'
			}),
			// Reference: https://github.com/webpack/extract-text-webpack-plugin
			// Extract css files
			new ExtractTextPlugin(isProd ? '[name].[chunkhash].css' : '[name].css'),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			})
		],

		/**
		 * PostCSS
		 * Reference: https://github.com/postcss/autoprefixer
		 */
		postcss: [
			autoprefixer({
				browsers: ['last 2 version']
			}),
			px2rem({
				remUnit: 75
			})
		],

		/**
		 * Dev server configuration
		 * Reference: http://webpack.github.io/docs/configuration.html#devserver
		 * Reference: http://webpack.github.io/docs/webpack-dev-server.html
		 */
		devServer: {
			contentBase: 'src',
			colors: true,
			historyApiFallback: true,
			port: 7080,
			stats: "errors-only", //表示只打印错误
		},
		resolve: {
			alias: {
				_views: path.resolve(APP_PATH, 'views'),
				_commonComponents: path.resolve(APP_PATH, 'commonComponents'),
				_config: path.resolve(APP_PATH, 'config'),
				_assets: path.resolve(APP_PATH, 'assets'),
				_service: path.resolve(APP_PATH, 'service'),
				_directive: path.resolve(APP_PATH, 'directive'),
				_filter: path.resolve(APP_PATH, 'filter')
			}
		}
	};

	if (isProd) {
		config.plugins.push(
			//http://npm.taobao.org/package/clean-webpack-plugin
			new CleanWebpackPlugin(['dist']),
			// Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
			// Only emit files when there are no errors
			new webpack.NoErrorsPlugin(),
			// Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
			// Dedupe modules in the output
			new webpack.optimize.DedupePlugin(),
			// Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
			// Minify all javascript, switch loaders to minimizing mode
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					drop_debugger: true,
					drop_console: true
				}
			})

		);
	}

	if (isProd) {
		config.devtool = 'source-map'
	} else {
		config.devtool = 'cheap-module-eval-source-map'
	}
	// add debug messages
	config.debug = !isProd || !isTest;

	return config;
}();

