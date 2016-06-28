var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var data = require('gulp-data');

var hbsfy = require('hbsfy').configure({
	extensions: ["html"]
});



gulp.task('browserify', function() {
	var b = browserify({
		entries: './src/main.js',
		debug: true,
		transform: [hbsfy]
	});

	return b.bundle()
	.pipe(data(function() {
		return require('./data.json')
	}))
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'));
});



gulp.task('default', function() {
	
});

