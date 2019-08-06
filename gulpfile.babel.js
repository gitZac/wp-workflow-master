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
import browserSync from 'browser-sync';
import zip from 'gulp-zip';
import replace from 'gulp-replace';
import info from './package.json';

const server = browserSync.create();
const PROD = yargs.argv.prod;

export const serve = (done) => {
    server.init({
        proxy: "https://test2.dev.cc/"
    });
    done();
}

export const reload = (done) => {
    server.reload();
    done();
}

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
        src: 'src/assets/img/**/*.{jpg,jpeg,png,svg,gif}',
        dest: 'dist/assets/img'
    },
    package:{
        src: ['**/*','!src{,/**}', '!.vscode', '!node_modules{,/**}', '!packaged{,/**}', '!.babelrc', '!.gitignore', '!gulpfile.babel.js', '!package.json', '!package-lock.json' ],
        dest:'packaged'
    }
}

export const styles = (done) =>{
    return gulp.src(paths.styles.src)
        .pipe(gulpif(!PROD, sourcemaps.init()))
            .pipe(gulpif(PROD, cleanCSS({compatibility: 'ie8'})))
            .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(!PROD, sourcemaps.write()))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
    done();
}

export const watch = () => {
    gulp.watch('src/assets/scss/**/*.scss', styles);
    gulp.watch('src/assets/js/**/*.js', gulp.series(scripts, reload));
    gulp.watch('**/*.php',reload);
    gulp.watch(paths.images.src,  gulp.series(images, reload));
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

export const compress = () => {
    return gulp.src(paths.package.src)
        .pipe(replace('_themename', info.name))
        .pipe(zip(`${info.name}.zip`))
        .pipe(gulp.dest(paths.package.dest));
}

export const build = gulp.series(clean, gulp.parallel(styles, scripts, images));

export const dev = gulp.series(clean, gulp.parallel(styles, scripts, images), serve, watch);

export const bundle = gulp.series(build, compress);

export default dev;