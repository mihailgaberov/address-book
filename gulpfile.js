// Load gulp packages
var gulp = require('gulp'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass');

var input = {
		'styles': 'src/styles/**/*.scss',
		'scripts': 'src/scripts/**/*.js'
	},
	output = {
		'styles': 'dist/styles',
		'scripts': 'dist/scripts'
	};

// Default task
gulp.task('default', function () {
	gulp.start('styles', 'scripts', 'browserify');
});

// Deploy the styles
gulp.task('styles', function () {
	return gulp.src(input.styles, {style: 'expanded'})
		.pipe(sass())
		.pipe(concat('main.css'))
		.pipe(gulp.dest(output.styles))
		.pipe(rename({suffix: '.min'}))
		.pipe(cssnano())
		.pipe(gulp.dest(output.styles))
		.pipe(notify({message: 'Styles task complete'}));
});

// Deploy the scripts
gulp.task('scripts', function () {
	return gulp.src(input.scripts)
		.pipe(concat('main.js'))
		.pipe(gulp.dest(output.scripts))
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(gulp.dest(output.scripts))
		.pipe(notify({message: 'Scripts task complete'}));
});

// Browserify
gulp.task('browserify', ['scripts'], function() {
	return browserify('./dist/scripts/main.min.js')
		.bundle()
		.pipe(source('main.min.js'))
		.pipe(gulp.dest('./dist/scripts'))
		.pipe(notify({message: 'Browserify task complete'}));
});

// Watch
gulp.task('watch', function () {
	// Watch .scss files
	gulp.watch('src/styles/**/*.scss', ['styles']);

	// Watch .js files
	gulp.watch('src/scripts/**/*.js', ['scripts']);
});