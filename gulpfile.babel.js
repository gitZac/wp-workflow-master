import gulp from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';


const PROD = yargs.argv.prod;

export const styles = (done) =>{
    return gulp.src('src/assets/scss/bundle.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(PROD, cleanCSS({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist/assets/css/bundle.css'))

    done();
}