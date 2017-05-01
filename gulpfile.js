var gulp        = require('gulp');
var sass        = require('gulp-sass');
var cssnano     = require('gulp-cssnano');
var sourcemaps  = require('gulp-sourcemaps');
var jsMinifier  = require('gulp-uglify');
var pug         = require('gulp-pug');
var gulpPrettify = require('gulp-prettify');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();

// Define
var src = {
    all: ['./resources/**/*.*', './resources/**/**/*.*'],
    css: './resources/assets/sass',
    js: './resources/assets/js',
    img: './resources/assets/images',
    html: './resources/views'
};

var dest = {
    css: './public/css',
    js: './public/js',
    img: './public/images',
    html: './'
};

var sassOptions = {
    noCache: true,
    errLogToConsole: true,
    style: 'cinputmpressed',
    outputStyle: 'expanded'
};

var pugOptions = {};

/* CSS: build */
gulp.task('css:build', function() {
    return gulp
        .src(src.css + '/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('Error', sass.logError))
        .pipe(gulp.dest(dest.css))
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(dest.css));
});

/* CSS: watch */
gulp.task('css:watch', function() {
    return gulp
        .watch([src.css + '/**/*.scss', src.css + '/*.scss'], ['css:build'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

// JS: minify
gulp.task('js:build', function() {
    return gulp
        .src([src.js + '/*.js', '!' + src.js + '/*.min.js'])
        .pipe(jsMinifier()).on('error', function(err){console.error('Error', err.toString());})
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(src.js));
});

// JS: Copy
gulp.task('js:copy', ['js:build'], function() {
    gulp.src(src.js + '/*.*').pipe(gulp.dest(dest.js));
});

// JS: Watch
gulp.task('js:watch', function() {
    return gulp
        .watch([src.js + '/*.js', '!' + src.js + '/*.min.js'], ['js:copy'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

// IMAGE: Copy
gulp.task('img:copy', function() {
    gulp.src(src.img + '/*.*').pipe(gulp.dest(dest.img));
});

// IMAGE: Watch
gulp.task('img:watch', function() {
    return gulp
        .watch([src.img + '/*.*'], ['img:copy'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

//HTML: build
gulp.task('html:build', function() {
    return gulp
        .src(src.html + '/*.pug')
        .pipe(pug(pugOptions))
        .pipe(gulpPrettify())
        .pipe(gulp.dest(dest.html));
});

//HTML: watch
gulp.task('html:watch', function() {
    return gulp
        .watch([src.html + '/**/*.pug', src.html + '/*.pug'], ['html:build'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('reload', ['css:build', 'css:watch', 'js:build', 'js:copy', 'js:watch', 'img:copy', 'img:watch', 'html:build', 'html:watch'], function() {
    gulp.watch(src.all).on('change', browserSync.reload);
});

gulp.task('default', ['css:build', 'css:watch', 'js:build', 'js:copy', 'js:watch', 'img:copy', 'img:watch', 'html:build', 'html:watch', 'reload']);