const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const scss = [
	"style-loader",
	"css-loader",
	"sass-loader",
	{
		loader: "sass-resources-loader",
		options: {
			resources: [
				path.resolve(__dirname, "./src/sass/include.sass")
			]
		}
	}
];
const sass = [
	"style-loader",
	"css-loader",
	"sass-loader?indentedSyntax",
	{
		loader: "sass-resources-loader",
		options: {
			resources: [
				path.resolve(__dirname, "./src/sass/include.sass")
			]
		}
	}
];

module.exports = {
	context: path.resolve(__dirname, "./src"),
	entry: {
		main: ["babel-polyfill", "./main.js"]
	},
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: "./",
		filename: "[name].js"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loaders: {
						scss,
						sass
					}
				}
			},
			{
				test: /\.css$/,
				loader: "css-loader"
			},
			{
				test: /\.scss$/,
				loader: scss
			},
			{
				test: /\.sass$/,
				loader: sass
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["env"],
							plugins: [
								[
									"babel-plugin-transform-builtin-extend", {
										globals: ["Error", "Array"]
									}
								],
								"transform-class-properties"
							]
						}
					}
				],
				exclude: /node_modules/
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["env", "flow"],
							plugins: [
								"transform-class-properties"
							]
						}
					}
				],
				include: /node_modules.*katex/
			},
			{
				test: /\.(gif|jpe?g|png)$/,
				loader: "file-loader"
			},
			{
				test: /\.svg$/,
				loader: "url-loader",
				options: {
					mimetype: "image/svg+xml"
				}
			},
			{
				test: /\.(ttf|otf|eot|woff2?)$/,
				loader: "file-loader?name=fonts/[name].[ext]"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Downline",
			template: "./index.html",
			seo: {
				keywords: "downline,game,zeronet",
				description: "Downline"
			}
		}),
		new CopyWebpackPlugin([
			{
				from: "./dbschema.json",
				to: "./dbschema.json"
			}
		]),
		new CopyWebpackPlugin([
			{
				from: "./content.json",
				to: "./content.json"
			}
		]),
		new CopyWebpackPlugin([
			{
				from: "./data",
				to: "./data"
			}
		])
	]
};