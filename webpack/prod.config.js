const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: "production",
	entry: {
		"a-plugin": "./src/main.js",
	},
	output: {
		filename: "[name].min.js",
		path: path.resolve(__dirname, "../dist"),
		clean: true,
		environment: {
			arrowFunction: false,
		},
	},

	module: {
		strictExportPresence: true,
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						// cacheDirectory: true,
						presets: [["@babel/preset-env"]],
					},
				},
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					"style-loader",
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
	plugins: [],
};
