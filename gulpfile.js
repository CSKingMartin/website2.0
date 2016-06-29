var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var data = require('gulp-data');
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var browserSync = require('browser-sync');
var cssmin = require('gulp-cssmin');
var rimraf = require('gulp-rimraf');
var ignore = require('gulp-ignore');
var glob = require('glob');

var hbsfy = require('hbsfy').configure({
	extensions: ["html"]
});



gulp.task('browserify', function() {
	var files = glob.sync('./src/**/*.js');
	var b = browserify({
		entries: files,
		debug: true,
		transform: [hbsfy]
	});

	return b.bundle()
	
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify())
		.on('error', gutil.log)
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./dist/js/'));
});

gulp.task('pages', function() {

	gulp.src('./src/pages/**/*.*')
	.pipe(gulp.dest('dist'));
});



gulp.task('default', function(done) {
	sequence('clean', 'pages', 'browserify', 'styles')
	
});

//compiles to css/minify
gulp.task('styles', function(){

	/*SASS is developer-friendly formatted CSS, unreadable by web browwers.
	gulp-sass takes these files, and creates a single master .css file
	in the 'dist' directory for deployment.
	Additionally, before the .css file is finished, our plugin gulp-cssmin
	minifies the css as well. */

	return gulp.src('src/stylesheets/*.scss')
		//compiles sass
		.pipe(sass().on('error', sass.logError))
		//minivfies css
		//.pipe(ccsmin())
		//puts .min suffix
		//.pipe(rename({suffix:'.min'}))
		//put in directory
		.pipe(gulp.dest('dist'))
		//refresh browser with changes
		.pipe(browserSync.reload({
			stream: true
		}));
});

//browserSync
gulp.task('browserSync', function()	{
	browserSync({
		server: {
			baseDir: 'dist'
		}
	})
});

//watch task
gulp.task('watch', ['default', 'browserSync'], function(){
	gulp.watch('src/templates/**/*.html',['default']);
	gulp.watch('src/pages/**/*.html', ['default']);
	gulp.watch('src/stylesheets/**/*.+(scss|css)', ['default']);
	gulp.watch('./data.json', ['default']);
	gulp.watch('src/articles/**/*.html',['default']);
	gulp.watch('src/js/**/*.js', ['default']);
});

gulp.task('clean', function() {
	return gulp.src('./dist/*', {read: false})
	.pipe(ignore('./dist/.git'))
	.pipe(rimraf());
});