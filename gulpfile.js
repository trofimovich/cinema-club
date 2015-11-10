var gulp = require("gulp"),
	gutil = require("gulp-util"),
	connect = require("gulp-connect"),
	compass = require("gulp-compass");

var templateSources = "src/js/app/templates/*.html";
var jsSources = [
					"src/js/*.js",
					"src/js/app/*.js",
					"src/js/app/collections/*.js",
					"src/js/app/models/*.js",
					"src/js/app/routers/*.js",
					"src/js/app/templates/*.js",
					"src/js/app/views/*.js",
				];

var sassSources = [
					"src/sass/*.scss",
					"src/sass/base/*.scss",
					"src/sass/fonts/*.scss",
					"src/sass/layout/*.scss",
					"src/sass/modules/*.scss",
					"src/sass/pages/*.scss",
					"src/sass/theme/*.scss",
					"src/sass/utilities/*.scss",
				];

var cssSources = "src/css/*.css";

gulp.task("compass", function() {
	gulp.src(sassSources)
		.pipe(compass({
			sass: "src/sass",
			image: "src/images",
			style: "expanded"
		}))
		.pipe(gulp.dest("src/css"));
});

gulp.task("watch", function() {
	gulp.watch([sassSources], ["compass"]);
	gulp.watch([templateSources, jsSources, sassSources], ["reload"]);
});

gulp.task("reload", function() {
	gulp.src("src/")
		.pipe(connect.reload());
})

gulp.task("connect", function() {
	connect.server({
		root: "src/",
		livereload: false
	});
});

gulp.task("default", ["connect", "watch"]);