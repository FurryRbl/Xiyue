import path from "path";
import lodash from "lodash";
import buildConfig from "./webpack.config.js";
import { __dirname } from "./webpack.config.js";

const devConfig = {
	mode: "development",
	devServer: {
		compress: true,
		port: 8103,
		static: {
			directory: path.resolve(__dirname, "build"),
		},
	},
	optimization: void 0,
};

export default lodash.merge({}, buildConfig, devConfig);
