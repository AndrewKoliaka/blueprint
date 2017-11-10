const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const imagemin = require('gulp-imagemin');
const merge = require('merge-stream');
const uglify = require('gulp-uglifyjs');
const cleanCSS = require('gulp-clean-css');
const minHTML = require('gulp-htmlmin');
const del = require('del');
const rigger = require('gulp-rigger');

const PATH = {
    src: {
        html: './src/index.html',
        styles: './src/less/index.less',
        js: './src/js/main.js',
        images: './src/assets/images/**/*',
        fonts: './src/assets/fonts/**/*',
        videos: './src/assets/videos/*'
    },
    public: {
        html: './public/',
        styles: './public/css/',
        js: './public/js/',
        fonts: './public/fonts/',
        images: './public/images/',
        videos: './public/videos'
    },
    prod: {
        html: './prod/',
        styles: './prod/css/',
        js: './prod/js/',
        fonts: './prod/fonts/',
        images: './prod/images/',
        videos: './prod/videos'
    },
    watch: {
        html: './src/**/*.html',
        js: './src/js/*.js',
        styles: './src/less/**/*.less'
    }
}

gulp.task('connect', () => {
    connect.server({root: './public', port: 3000, livereload: true});
});

gulp.task('styles:build', () => {
    return gulp
        .src(PATH.src.styles)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(autoprefixer())
        .pipe(gulp.dest(PATH.public.styles))
        .pipe(connect.reload());
});

gulp.task('js:build', () => {
    return gulp
        .src(PATH.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(PATH.public.js))
        .pipe(connect.reload());
});

gulp.task('html:build', () => {
    return gulp
        .src(PATH.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(PATH.public.html))
        .pipe(connect.reload());
});

gulp.task('assets:build', () => {
    let images = gulp
        .src(PATH.src.images)
        .pipe(gulp.dest(PATH.public.images));

    let fonts = gulp
        .src(PATH.src.fonts)
        .pipe(gulp.dest(PATH.public.fonts));

    let videos = gulp
        .src(PATH.src.videos)
        .pipe(gulp.dest(PATH.public.videos));

    return merge(images, fonts, videos);
});

gulp.task('assets:prod', () => {
    let images = gulp
        .src(PATH.src.images)
        .pipe(imagemin())
        .pipe(gulp.dest(PATH.prod.images));

    let fonts = gulp
        .src(PATH.src.fonts)
        .pipe(gulp.dest(PATH.prod.fonts));

    let videos = gulp
        .src(PATH.src.videos)
        .pipe(gulp.dest(PATH.prod.videos));

    return merge(images, fonts, videos);
});

gulp.task('styles:prod', () => {
    return gulp
        .src(PATH.src.styles)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(autoprefixer())
        .pipe(gulp.dest(PATH.prod.styles));
});

gulp.task('js:prod', () => {
    return gulp
        .src(PATH.src.js)
        .pipe(rigger())
        .pipe(gulp.dest(PATH.prod.js));
});

gulp.task('html:prod', () => {
    return gulp
        .src(PATH.src.html)
        .pipe(rigger())
        .pipe(minHTML({collapseWhitespace: true}))
        .pipe(gulp.dest(PATH.prod.html));
});

gulp.task('del', () => {
    del(['public', 'prod']);
});

gulp.task('watch', () => {
    gulp.watch(PATH.watch.html, ['html:build']);
    gulp.watch(PATH.watch.js, ['js:build']);
    gulp.watch(PATH.watch.styles, ['styles:build']);
});

gulp.task('build:public', ['styles:build', 'js:build', 'assets:build', 'html:build']);
gulp.task('build:prod', ['styles:prod', 'js:prod', 'assets:prod', 'html:prod']);
gulp.task('default', ['build:public', 'connect', 'watch']);