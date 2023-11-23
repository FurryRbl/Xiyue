import gulp from "gulp";
import rename from "gulp-rename";
import postcss from "gulp-postcss";
import cleanCSS from "gulp-clean-css";
import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export function css() {
	return gulp
		.src("src/tailwind.css")
		.pipe(postcss([postcssImport, tailwindcss, autoprefixer]))
		.pipe(cleanCSS())
		.pipe(rename("tailwind.css"))
		.pipe(gulp.dest("source"));
}

export function watch() {
	css();
	gulp.watch("layout/**", css);
}

export default gulp.parallel(css);
