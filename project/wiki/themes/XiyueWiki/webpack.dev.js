import lodash from "lodash";
import buildConfig from "./webpack.config.js";

const devConfig = {
	mode: "development",
	watch: true,
	optimization: void 0,
};

export default lodash.merge({}, buildConfig, devConfig);
