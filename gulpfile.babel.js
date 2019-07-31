import gulp from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import named from 'vinyl-named';

const PROD = yargs.argv.prod;

const paths = { //refactored style paths.
    styles: {
        src:['src/assets/scss/bundle.scss','src/assets/scss/admin.scss'],
        dest:'dist/assets/css' 
    },
    scripts: {
        src: ['src/assets/js/bundle.js', 'src/assets/js/admin.js'],
        dest: 'dist/assets/js'
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
    gulp.watch('src/assets/js/**/*.js', scripts);
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

export const scripts = (done) => {
    return gulp.src(paths.scripts.src)
        .pipe(named())
        .pipe(webpack({
            module: {
                rules:[
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['babel-preset-env']
                            }
                        }
                    }
                ]
            }, 
            output: {
                filename: '[name].js'
            },
            externals:{
                jquery:'jQuery'
            },
            devtool: !PROD ? 'inline-source-map' : false
        }))
        .pipe(gulp.dest(paths.scripts.dest))
    
        done();
}

export const build = gulp.series(clean, gulp.parallel(styles, scripts, images));

export const dev = gulp.series(clean, gulp.parallel(styles, scripts, images), watch);

export default dev;