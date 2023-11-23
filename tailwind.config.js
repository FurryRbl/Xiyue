/** @type {import('tailwindcss').Config} */
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
	content: ["./src/**/*.{vue,js,html}"],
	theme: {
		extend: {},
	},
	plugins: [tailwindcss, autoprefixer],
};
