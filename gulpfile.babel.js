import gulp from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import del from 'del';

const PROD = yargs.argv.prod;

const paths = { //refactored style paths.
    styles: {
        src:['src/assets/scss/bundle.scss','src/assets/scss/admin.scss'],
        dest:'dist/assets/css' 
    },
    images: {
        src: 'src/assets/images/**/*.{jpg,jpeg,png,svg,gif}',
        dest: 'dist/assets/images'
    }
}

export const styles = (done) =>{
    return gulp.src(paths.styles.src)
        .pipe(gulpif(!PROD, sourcemaps.init()))
            .pipe(gulpif(PROD, cleanCSS({compatibility: 'ie8'})))
            .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(!PROD, sourcemaps.write()))
        .pipe(gulp.dest(paths.styles.dest))
    done();
}

export const watch = () => {
    gulp.watch('src/assets/scss/**/*.scss', styles);
    gulp.watch(paths.images.src, images);
}

export const images = () => {
    return gulp.src(paths.images.src)
        .pipe(gulpif(PROD, imagemin()))
        .pipe(gulp.dest(paths.images.dest));
}

export const clean = () => {
    return del(['dist']);
}

export const build = gulp.series(clean, gulp.parallel(styles, images));

export const dev = gulp.series(clean, gulp.parallel(styles, images), watch);

export default dev;