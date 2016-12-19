var gulp     = require("gulp"),
plumber      = require("gulp-plumber"),
browserSync  = require("browser-sync"),
compass 	 = require('gulp-compass');


gulp.task("server", function() {
	browserSync({
		port: 9000,
		server: {
			baseDir: "app"
		}
	});

	gulp.watch([
		"app/*.html",
		"app/pages/*.html",
		"app/_scss/**/*.scss",
		"app/js/**/*.js"
		], ['watch']);
});

gulp.task('watch', ['compass'], function (done){
	browserSync.reload();
	done();
});

gulp.task('compass', function() {
	return gulp.src('./app/_scss/*.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: './config.rb',
		css: './app/css',
		sass: './app/_scss/'
	}))
});



gulp.task("default", ["server"]);