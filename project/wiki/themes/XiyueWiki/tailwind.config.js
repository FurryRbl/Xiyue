import tailwindcss from "tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.js", "./layout/**/*.ejs"],
	theme: {
		extend: {},
	},
	plugins: [tailwindcss],
};
