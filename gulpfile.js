const gulp = require('gulp');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');
const jsonmin = require('gulp-jsonmin');
const jsonEditor = require('gulp-json-editor');

const isProd = process.title.includes("--prod");

gulp.task('clean', () => {
    return gulp.src('./out/404.html', {
                    read: false
                })
                .pipe(clean());
});

gulp.task('build:js', () => {
    const pipes = gulp.src(['./out/*.js']);
    if(isProd) {
        pipes.pipe(uglify());
    }
    return pipes.pipe(gulp.dest('./out'));
});

gulp.task('replace:manifest', () => {
    const pipes = gulp.src('./out/manifest.json')
                      .pipe(jsonEditor(json => {
                          json.devTools = !isProd;
                          return json;
                      }));
    if(isProd) {
        pipes.pipe(jsonmin());
    }
    return pipes.pipe(gulp.dest('./out'));
});

gulp.task('build', gulp.series('clean', 'build:js', 'replace:manifest'));
