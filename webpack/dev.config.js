const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: {
		"a-plugin": "./src/main.js",
	},
	devServer: {
		contentBase: "../dist",
		hot: true,
		port: 8088,
		inline: true,
		overlay: {
			warnings: true,
			errors: true,
		},
	},
	output: {
		filename: "[name].[hash:4].min.js",
		path: path.resolve(__dirname, "../dist"),
		environment: {
			arrowFunction: false,
		},
		library: {
			type: "window",
		},
		clean: true,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "../src/"),
			"@assets": path.resolve(__dirname, "../assets/"),
		},
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "babel-loader",
						options: {
							// cacheDirectory: true,
							presets: ["@babel/preset-env"],
						},
					},
				],
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [autoprefixer, cssnano],
							},
						},
					},
					"sass-loader",
				],
			},
			{
				test: /\.svg$/,
				exclude: /node_modules/,
				loader: "svg-inline-loader",
			},
			{
				test: /\.art$/,
				exclude: /node_modules/,
				loader: "art-template-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "../public/index.html"),
			scriptLoading: "blocking",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[hash:4].min.css",
		}),
	],
};
