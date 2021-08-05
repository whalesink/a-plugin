const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
	mode: "development",
	entry: {
		lib: "./src/main.js",
	},
	output: {
		filename: "[name].[hash:4].min.js",
		path: path.resolve(__dirname, "../temp"),
		clean: true,
	},

	module: {
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
