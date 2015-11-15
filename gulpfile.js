var gulp = require("gulp"),
	gutil = require("gulp-util"),
	connect = require("gulp-connect"),
	compass = require("gulp-compass"),
	minifyCSS = require("gulp-minify-css"),
	rjs = require("gulp-requirejs"),
	uglify = require("gulp-uglify"),
	minifyHTML = require("gulp-minify-html"),
	replaceHTML = require("gulp-html-replace");

env = process.env.NODE_ENV || "development";

if(env === "development") {
	outputDir = "src";
	sassStyle = "expanded";
} else {
	outputDir = "dist";
	sassStyle = "compressed";
}

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

var styleSources = [
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

gulp.task("html", function() {
	gulp.src(["src/*.html"])
		.pipe(replaceHTML({ requirejs: "js/main.js" }))
		.pipe(minifyHTML())
		.pipe(gulp.dest(outputDir));
});

gulp.task("compass", function() {
	gulp.src(styleSources)
		.pipe(compass({
			sass: "src/sass",
			image: outputDir + "/images/",
			font: outputDir + "/fonts/",
			import_path: "",
			style: sassStyle
		}))
		.pipe(minifyCSS({ processImport: true }))
		.pipe(gulp.dest(outputDir + "/css"));
});

gulp.task("js", function() {
	rjs({
		baseUrl: "src/js",
		out: "main.js",
		paths: {
			"jquery": "../vendor/jquery/dist/jquery",
			"underscore": "../vendor/underscore-amd/underscore",
			"backbone": "../vendor/backbone-amd/backbone",
			"bootstrap": "../vendor/bootstrap/dist/js/bootstrap",
			"requirejs-text": "../vendor/text/text",
			"backbone-local-storage": "../vendor/backbone.localStorage/backbone.localStorage-min",
			"backbone-crossdomain": "../vendor/backbone.crossdomain/Backbone.CrossDomain",
			"nicescroll": "../vendor/jquery.nicescroll/jquery.nicescroll.min",
			"requireLib": '../vendor/requirejs/require'
		},
		name: "main",
		shim: {
			"bootstrap": {
				deps: ["jquery"],
				exports: "$.fn.popover"
			},

			"backbone-local-storage": {
				deps: ["backbone"]
			},

			"nicescroll": {
				deps: ["jquery"]
			}
		},
		include: ["requireLib"]
	})
	.pipe(uglify())
	.pipe(gulp.dest(outputDir + "/js"))
});

gulp.task("images", function() {
	gulp.src("src/images/*.png")
		.pipe(gulp.dest(outputDir + "/images"));
});

gulp.task('fonts', function() {
	return gulp.src([
		"src/vendor/font-awesome/fonts/fontawesome-webfont.*",
		"src/fonts/*.ttf",
		"src/fonts/*.woff"
		])
	.pipe(gulp.dest(outputDir + '/fonts'));
});

gulp.task("watch", function() {
	gulp.watch([styleSources], ["compass"]);
	gulp.watch([templateSources, jsSources, styleSources], ["reload"]);
});

gulp.task("reload", function() {
	gulp.src("src/")
		.pipe(connect.reload());
})

gulp.task("connect", function() {
	connect.server({
		root: "",
		livereload: false
	});
});

gulp.task("build", ["compass", "js", "images", "fonts", "html"]);
gulp.task("default", ["connect", "watch"]);