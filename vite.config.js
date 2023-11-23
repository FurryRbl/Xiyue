import path from "path";
import fs from "fs-extra";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import compression2 from "vite-plugin-compression2";

function getPagePath() {
	const map = {};
	fs.readdirSync("./src", { withFileTypes: true }).forEach((file) => {
		const filePath = path.join("./src", file.name);
		if (file.isDirectory()) {
			// 如果是文件夹，继续遍历子文件夹
			const htmlFilesInSubfolder = fs
				.readdirSync(filePath)
				.filter((subfile) => subfile.endsWith(".html"));
			htmlFilesInSubfolder.forEach((subfile) => {
				const fileName = path.basename(subfile, ".html"); // 去除扩展名
				map[fileName] = path
					.join(filePath, subfile)
					.replace(/\\/g, "/"); // 使用正斜杆
			});
		} else if (file.isFile() && filePath.endsWith(".html")) {
			// 如果是 HTML 文件，记录位置信息
			const fileName = path.basename(file.name, ".html"); // 去除扩展名
			map[fileName] = filePath.replace(/\\/g, "/"); // 使用正斜杆
		}
	});
	return map;
}

export default defineConfig({
	root: "src",
	base: "/",
	publicDir: "../public",
	server: {
		host: true,
		port: 8100,
		strictPort: true,
		proxy: {
			"/wiki": "http://localhost:8101/",
			"/book": "http://localhost:8102/",
			"/common": {
				target: "http://localhost:8103/",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/common/, ""),
			},
		},
	},
	build: {
		outDir: "../build",
		rollupOptions: {
			input: getPagePath(),
			output: {
				format: "es",
				// 动态分割依赖
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return "vendor";
					}
				},
			},
		},
	},
	optimizeDeps: {
		include: Object.keys(getPagePath()),
	},
	plugins: [vue(), compression2()],
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
});
