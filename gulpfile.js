var gulp = require("gulp"),
	gutil = require("gulp-util"),
	connect = require("gulp-connect");

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

var cssSources = "src/css/*.css";

gulp.task("watch", function() {
	gulp.watch([templateSources, jsSources, cssSources], ["reload"]);
});

gulp.task("reload", function() {
	gulp.src("src/")
		.pipe(connect.reload());
})

gulp.task("connect", function() {
	connect.server({
		root: "src/",
		livereload: true
	});
});

gulp.task("default", ["connect", "watch"]);