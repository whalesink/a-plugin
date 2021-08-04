const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
	mode: "production",
	entry: {
		lib: "./src/main.js",
	},
	output: {
		filename: "[name].min.js",
		path: path.resolve(__dirname, "../dist"),
		clean: true,
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: "babel-loader",
						options: {
							// cacheDirectory: true,
							presets: ["@babel/preset-env"],
						},
					},
				],
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				// use: ["css-loader", "sass-loader"],
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
							plugins: [autoprefixer, cssnano],
						},
					},
					"sass-loader",
				],
			},
		],
	},
};
