'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import 'regenerator-runtime/runtime';

// variables
const paths = {
    styles: {
        extendSrc: 'src/scss/*.scss',
        extendDest: 'dist/css'
    },
    js: {
        jsSrc: 'src/js/*.js',
        jsDest: 'dist/js'
    },
    files: {
        imagesSrc: 'src/images/*.+(png|jpg|jpeg|gif|svg)',
        imagesDest: 'dist/images'
    }
};

// SCSS
gulp.task('extendScss', function () {
    return gulp.src(paths.styles.extendSrc)

        //prefix
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulp.dest(paths.styles.extendDest))

        //min
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.extendDest));

});

// JS
gulp.task('mainJs', async function () {

    gulp.src(paths.js.jsSrc)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.js.jsDest));

});

// Optimizing Images 
gulp.task('images', function () {
    return gulp.src(paths.files.imagesSrc)
        .pipe(cache(imagemin({
            interlaced: true,
        })))
        .pipe(gulp.dest(paths.files.imagesDest));
});

// Watcher
gulp.task('watch', function () {

    gulp.watch(paths.styles.extendSrc, gulp.series('extendScss'));
    gulp.watch(paths.js.jsSrc, gulp.series('mainJs'));
    gulp.watch(paths.files.imagesSrc, gulp.series('images'));

});

gulp.task('default', gulp.series('images', 'extendScss', 'mainJs', 'watch'));