const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const validator = require('gulp-html');
const del = require('del');

// Compile Sass & Inject into browser
gulp.task('sass', () => {
	gulp.src('./src/scss/*.scss')
		.pipe(sass({outputStyle: "compressed"}))
		.pipe(concat("main.css"))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

// Move Final CSS to dist/css
gulp.task('css', () => {
	gulp.src('./src/css/*.css')
    .pipe(gulp.dest("dist/css"))
});


//Move Font Awesome Css to src/css
gulp.task('fa', function(){
	return gulp.src('@fortawesome/fontawesome-free/fontawesome.min.css')
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());
});

// Move JS files to SRC/JS
gulp.task('js', () => {
	gulp.src(['node_modules/@fortawesome/fontawesome-free/js/fontawesome.min.js', './src/js/*.js'])
		.pipe(concat("main.js"))
		.pipe(gulp.dest("src/js"))	
		.pipe(browserSync.stream());
});

// Move html over to Dist
gulp.task('html', () => {
	gulp.src("./src/index.html")
		.pipe(validator())
		.pipe(gulp.dest("dist/"))
});

//Uglify and Concat all JS files
gulp.task('scripts', () => {
	gulp.src(['./src/js/*.es6', './src/js/*.js'])
		.pipe(babel({presets: ['@babel/env']}))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"))
});

// Watch Sass & Server
gulp.task('serve', ['sass'], function(){
	browserSync.init({
		server: "./src"
	});
	gulp.watch(['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
	gulp.watch("src/*.js").on('change', browserSync.reload);
});




gulp.task('default', ['js', 'serve', 'fa', 'sass']);
gulp.task('build', ['scripts', 'html'])


