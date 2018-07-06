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
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "InterNIC - Downline",
			template: "./index.html",
			seo: {
				keywords: "internic,downline,game,zeronet",
				description: "InterNIC - Downline"
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
				from: "./p2p.json",
				to: "./p2p.json"
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