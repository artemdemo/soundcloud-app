import gulp from 'gulp';
import gutil from 'gulp-util';
import less from 'gulp-less';
import rename from 'gulp-rename';
import runSequence from 'run-sequence';
import del from 'del';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import path from 'path';
import fs from 'fs';
import _ from 'underscore';
import yargs from 'yargs';

const args = yargs
    .options('dev', {
        alias: 'd',
        describe: 'dev build',
        boolean: true
    }).argv;


const randomID = () => {
    return 'xxxxxxxx'.replace(
        /[xy]/g,
        (c) => {
            let r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
};
let hash = {
    css: randomID(),
    js: randomID()
};

let environment = args.dev ? '"development"' : '"production"';

if (args.dev) {
    environment = '"development"';
} else {
    environment = '"production"';
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': environment,
    '__DEV__': environment === '"development"'
}));

const compiler = webpack(webpackConfig);

gulp.task('js', ['clean'], function(callback) {
    function report(resolve, err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        hash.js = stats.compilation.hash;
        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true
        }));
        resolve();
    }

    Promise.all([
        new Promise(function(resolve) {
            compiler.run(report.bind(null, resolve));
        })
    ]).then(function() {
        runSequence('clean', 'html');
        callback();
    });
});


gulp.task('js-watch', ['clean'], function() {
    compiler.watch({
        aggregateTimeout: 300,
        poll: true
    }, function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }

        hash.js = stats.compilation.hash;
        runSequence('clean', 'html');

        gutil.log('[webpack]', stats.toString({
            chunks: false,
            colors: true
        }));
    });
});

gulp.task('html', function() {
    const htmlSrc = path.join(__dirname, 'source', 'index.html');
    const template = fs.readFileSync(htmlSrc, 'utf8');
    const html = _.template(template)({hash});
    fs.writeFile(path.join(__dirname, 'index.html'), html);
});

gulp.task('clean', function(callback) {
    del([
        'dist/js/*.js',
        'dist/js/*.js.map',
        `!dist/js/bundle-${hash.js}.js`,
        `!dist/js/bundle-${hash.js}.js.map`,
        'dist/css/*.css',
        `!dist/css/styles-${hash.css}.css`
    ]).then(function() {
        callback();
    });
});

gulp.task('less', ['clean'], function () {
    hash.css = hash.js;
    return gulp.src('./source/less/styles.less')
        .pipe(less())
        .on('error', function(err) {
            // Handle less errors, but do not stop watch task
            gutil.log(gutil.colors.red.bold('[Less error]'));
            gutil.log(gutil.colors.bgRed('filename:') +' '+ err.filename);
            gutil.log(gutil.colors.bgRed('lineNumber:') +' '+ err.lineNumber);
            gutil.log(gutil.colors.bgRed('extract:') +' '+ err.extract.join(' '));
            this.emit('end');
        })
        .pipe(rename(`styles-${hash.css}.css`))
        .pipe(gulp.dest('./dist/css'))
        .on('end', function() {
            runSequence('clean', 'html');
        });
});

gulp.task('copy', function () {
    return gulp
        .src([
            './node_modules/font-awesome/fonts/FontAwesome.otf',
            './node_modules/font-awesome/fonts/fontawesome-webfont.eot',
            './node_modules/font-awesome/fonts/fontawesome-webfont.svg',
            './node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
            './node_modules/font-awesome/fonts/fontawesome-webfont.woff',
            './node_modules/font-awesome/fonts/fontawesome-webfont.woff2'
        ])
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('less-watch', () => {
    gulp.watch('./source/less/**/*.less', ['less']);
});

gulp.task('build', ['copy', 'js', 'less']);
gulp.task('watch', ['clean', 'js-watch', 'less', 'less-watch']);
