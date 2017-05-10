const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');

const pathTo = {
    less: 'src/assets/less/**/*.less',
    js: 'src/js/*.js',
    css: 'src/assets/css/*.css'
}

gulp.task('connect', () => {
    connect.server({
        root: './',
        port: 3000,
        livereload: true
    });
});

gulp.task('less', () => {
    gulp.src(pathTo.less)
        .pipe(concat('styles.css'))
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gulp.dest('src/assets/css'))
        .pipe(connect.reload());
});

gulp.task('js', () => {
    gulp.src('src/js/*.js')
        .pipe(connect.reload());
});

gulp.task('html', () => {
    gulp.src('index.html')
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(pathTo.less, ['less']);
    gulp.watch(pathTo.js, ['js']);
    gulp.watch('./index.html', ['html']);
});

gulp.task('default', ['less', 'connect', 'watch']);
gulp.task('build', ['less', 'js']);