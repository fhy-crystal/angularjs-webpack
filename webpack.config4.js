'use strict';
// Modules
const path = require('path');
const APP_PATH = path.resolve(__dirname, 'src');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// set the environment by npm lifecycle event , `npm run build` npm_lifecycle_event is build
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test';
const isProd = ENV === 'build' || ENV === 'build:mini';

module.exports = {
	entry: {
		'vendor': [
			'angular-touch',
			'angular-sortable-view',
			'lib-flexible'
		],
		'app': './src/app.js',
	},
	externals: {
		jquery: 'jQuery',
		angular: 'angular',
		uiRouter: 'angular-ui-router',
		uiBootstrap: 'angular-ui-bootstrap'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: isProd ? './' : '/',
		filename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js',
		chunkFilename: isProd ? '[name].[chunkhash].js' : '[name].bundle.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			__PRO_ENV__: JSON.parse(JSON.stringify(process.env.NODE_ENV))
		}),
		new MiniCssExtractPlugin({
			filename: isProd ? '[name].css' : '[name].[hash].css',
			chunkFilename: isProd ? '[id].css' : '[id].[hash].css',
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './favicon.ico',
			chunks: ['vendor', 'app']
		})
	],
	module: {
		rules: [{
			test: /\.js$/,
			// use: ['babel-loader']
		}, {
			test: /\.html$/,
			use: ['raw-loader']
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				{
					loader: 'px2rem-loader',
					options: {
						remUni: 75
					}
				}
			]
		}, {
			test: /\.less$/,
			use: [
				'style-loader',
				'css-loader',
				'postcss-loader',
				{
					loader: 'px2rem-loader',
					options: {
						remUni: 75
					}
				},
				'less-loader'
			]
		}, {
			test: /\.(woff|woff2|ttf|eot)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					importLoaders: 1,
					limit: 1000,
					outputPath: 'fonts',
					name: '[name].[ext]?[hash]',
				},
			}
			]
		}, {
			test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
			use: [{
				loader: 'url-loader',
				options: {
					limit: 8192,
					outputPath: 'images',
					name: '[name].[ext]?[hash]',
				},
			}]
		}]
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
	},
	devServer: {
		contentBase: path.join(__dirname, "dist"),
		open: true,
		port: 7080,
		overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
		stats: "errors-only", //表示只打印错误
		inline: true,
		hot: true
	}
}
