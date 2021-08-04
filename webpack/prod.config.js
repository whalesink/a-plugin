const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
	mode: "production",
	entry: {
		"a-plugin": "./src/main.js",
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
				loader: "svg-inline-loader",
			},
			{
				test: /\.art$/,
				loader: "art-template-loader",
			},
		],
	},
	plugins: [],
};
