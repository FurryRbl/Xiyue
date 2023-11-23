import path from "path";
import { fileURLToPath } from "url";
import TerserPlugin from "terser-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

var miniCssExtractPlugin = new MiniCssExtractPlugin({
	filename: "style.css",
});

export default {
	entry: "./src/js/main.js",
	mode: "production",
	devtool: false,
	output: {
		path: path.resolve(__dirname, "source"),
		filename: "script.js",
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				type: "asset/resource",
				generator: {
					filename: "font/[name][ext]",
				},
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},
	plugins: [miniCssExtractPlugin],
};
