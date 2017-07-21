const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const del = require('del');

const pathTo = {
    index: './index.html',
    less: 'src/assets/less/**/*.less',
    js: 'src/js/*.js',
    css: 'src/assets/css/*.css',
    images: 'src/assets/images/**/*'
}

gulp.task('connect', () => {
    connect.server({root: './', port: 3000, livereload: true});
});

gulp.task('less', () => {
    gulp
        .src(pathTo.less)
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
});

gulp.task('js', () => {
    gulp
        .src(pathTo.js)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload());
});

gulp.task('libs', () => {
    gulp
        .src('src/assets/libs/**')
        .pipe(gulp.dest('dist/libs/'));
});

gulp.task('html', () => {
    gulp
        .src(pathTo.index)
        .pipe(connect.reload());
});

gulp.task('assets', () => {
    let images = gulp
        .src(pathTo.images)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));

    let fonts = gulp
        .src('src/assets/fonts/**')
        .pipe(gulp.dest('dist/fonts/'));

    let videos = gulp
        .src('src/assets/videos/*')
        .pipe(gulp.dest('dist/videos/'));

    return merge(images, fonts, videos);
});

gulp.task('del', () => {
    del(['dist']);
});

gulp.task('watch', () => {
    gulp.watch(pathTo.less, ['less']);
    gulp.watch(pathTo.js, ['js']);
    gulp.watch(pathTo.index, ['html']);
});

gulp.task('default', ['less', 'connect', 'watch']);
gulp.task('build', ['less', 'js', 'assets', 'libs']);