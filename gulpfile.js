var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var del = require('del');
var glob = require('glob');
var merge = require('merge-stream');
var paths = require('./gulp.config.json');
var plato = require('plato');
var plug = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;

var karmaServer = require('karma').Server;

var colors = plug.util.colors;
var env = plug.util.env;
var log = plug.util.log;

var port = process.env.PORT || 7203;


/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);



/**
 * Lint the code, create coverage report, and a visualizer
 * @return {Stream}
 */
gulp.task('analyze', function() {
    log('Analyzing source with JSHint, JSCS, and Plato');
    var jshint = analyzejshint([].concat(paths.js, paths.nodejs));
    var jscs = analyzejscs([].concat(paths.js, paths.nodejs));
    startPlatoVisualizer();
    return merge(jshint, jscs);
});



/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', function() {
    log('Creating an AngularJS $templateCache');

    return gulp
        .src(paths.htmltemplates)
        .pipe(plug.minifyHtml({
            empty: true
        }))
        .pipe(plug.angularTemplatecache('templates.js', {
            module: 'app.engine.core',
            standalone: false,
            root: 'app/'
        }))
        .pipe(gulp.dest(paths.build));
});



/**
 * Minify and bundle the app's JavaScript
 * @return {Stream}
 */
gulp.task('js', ['analyze', 'templatecache'], function() {
    log('Bundling, minifying, and copying the app\'s JavaScript');

    var source = [].concat(paths.js, paths.build + 'templates.js');
    return gulp
        .src(source)
        .pipe(plug.concat('all.min.js'))

        .pipe(plug.bytediff.start())
        .pipe(plug.uglify({
            mangle: false
        }))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build));
});



/**
 * Copy the Vendor JavaScript
 * @return {Stream}
 */
gulp.task('vendorjs', function() {
    log('Bundling, minifying, and copying the Vendor JavaScript');

    return gulp.src(paths.vendorjs)
        .pipe(sourcemaps.init())
        //.pipe(plug.bytediff.start())
        .pipe(plug.concat('vendor.min.js'))
        .pipe(plug.uglify())
        .pipe(sourcemaps.write('.'))
        //.pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build));
});



/**
 * Minify and bundle the CSS
 * @return {Stream}
 */
gulp.task('css', function() {
    log('Bundling, minifying, and copying the app\'s CSS');

    return gulp.src(paths.css)
        .pipe(plug.concat('all.min.css')) // Before bytediff or after
        .pipe(plug.autoprefixer('last 2 version', '> 5%'))
        //.pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        //.pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build + 'assets/css'));
});



/**
 * Minify and bundle the Vendor CSS
 * @return {Stream}
 */
gulp.task('vendorcss', function() {
    log('Compressing, bundling, copying vendor CSS');

    var vendorFilter = plug.filter(['**/*.css']);

    return gulp.src(paths.vendorcss)
        .pipe(vendorFilter)
        .pipe(plug.concat('vendor.min.css'))
        .pipe(plug.bytediff.start())
        .pipe(plug.minifyCss({}))
        .pipe(plug.bytediff.stop(bytediffFormatter))
        .pipe(gulp.dest(paths.build + 'assets/css'));
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('fonts', function() {
    var dest = paths.build + 'assets/fonts';
    log('Copying fonts');
    return gulp
        .src(paths.fonts)
        .pipe(gulp.dest(dest));
});


/**
 * Copy flags
 * @return {Stream}
 */
gulp.task('flags', function() {
    var dest = paths.build + 'assets/flags';
    log('Copying flags');
    return gulp
        .src(paths.flags)
        .pipe(gulp.dest(dest));
});


/**
 * Copy i18n
 * @return {Stream}
 */
gulp.task('i18n', function() {
    var dest = paths.build + 'assets/i18n';
    log('Copying i18n files');
    return gulp
        .src(paths.i18n)
        .pipe(plug.jsonminify())
        .pipe(gulp.dest(dest));
});


/**
 * Compress images
 * @return {Stream}
 */
gulp.task('images', function() {
    var dest = paths.build + 'assets/images';
    log('Compressing, caching, and copying images');
    return gulp
        .src(paths.images)
        .pipe(plug.cache(plug.imagemin({
            optimizationLevel: 3
        })))
        .pipe(gulp.dest(dest));
});


/**
 * Copy user_data
 * @return {Stream}
 */
gulp.task('app_data', function() {
    var dest = paths.build + 'app_data';
    log('Copying app_data files');
    return gulp
        .src(paths.app_data)
        //.pipe(plug.jsonminify())
        .pipe(gulp.dest(dest));
});




/**
 * Revisioning Js.min files
 * @return {Stream}
 */
gulp.task('rev-inject', ['js', 'vendorjs', 'css', 'vendorcss'], function() {
    log('Rev\'ing files and Building index.html');

    var indexHtml = paths.client + 'index.html';
    var vendorJs = ['./build/vendor.min.js', '!./build/*.map'];
    var personalJs = ['./build/all.min.js', '!./build/*.map'];
    var vendorCss = ['./build/assets/css/vendor.min.css', '!./build/*.map'];
    var personalCss = ['./build/assets/css/all.min.css', '!./build/*.map'];

    return gulp

        // inject the files into index.html
        .src(indexHtml) // index.html is the source file now
        .pipe(plug.inject(gulp.src(vendorJs, {read: false}), {name: 'inject-vendor', ignorePath: paths.build.substring(1)}, {relative: true}))
        .pipe(plug.inject(gulp.src(personalJs, {read: false}), {ignorePath: paths.build.substring(1)}))
        .pipe(plug.inject(gulp.src(vendorCss, {read: false}), {name: 'inject-vendor', ignorePath: paths.build.substring(1)}))
        .pipe(plug.inject(gulp.src(personalCss, {read: false}), {ignorePath: paths.build.substring(1)}))
        .pipe(gulp.dest(paths.build)) // write first version of index.html

});



/**
 * Build the optimized app
 * @return {Stream}
 */
gulp.task('build', ['rev-inject', 'images', 'fonts', 'i18n', 'flags', 'app_data'], function() {
    log('Building the optimized app');

    return gulp.src('').pipe(plug.notify({
        onLast: true,
        message: 'Deployed code!'
    }));
});



/**
 * Remove all files from the build folder
 * One way to run clean before all tasks is to run
 * from the cmd line: gulp clean && gulp build
 * @return {Stream}
 */
gulp.task('clean', function(cb) {
    log('Cleaning: ' + plug.util.colors.blue(paths.build));
    var delPaths = [].concat(paths.build, paths.report);
    del(delPaths, cb);
});



/**
 * Run test once and exit
 */
gulp.task('karmaTestOnce', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


/**
 * Run test once and exit
 */
gulp.task('karmaTestAndWatch', function (done) {
    new karmaServer({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});



/**
 * serve the development environment
 */
gulp.task('serve-development', function() {
    serve({
        mode: 'development',
        port: port
    });
});


/**
 * serve the production environment
 */
gulp.task('serve-production', function() {
    serve({
        mode: 'production'
    });
});


/**
 * serve the development environment on MongoLab
 */
gulp.task('serve-dev-mongolab', function() {
    serve({
        mode: 'dev-mongolab',
        port: port
    });
});


/**
 * serve the development environment on MongoLab
 */
gulp.task('serve-prod-mongolab', function() {
    serve({
        mode: 'prod-mongolab'
    });
});





//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
// Gulp External Function/////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////



/**
 * Execute JSHint on given source files
 * @param  {Array} sources
 * @param  {String} overrideRcFile
 * @return {Stream}
 */
function analyzejshint(sources, overrideRcFile) {
    var jshintrcFile = overrideRcFile || './.jshintrc';
    log('Running JSHint');
    log(sources);
    return gulp
        .src(sources)
        .pipe(plug.jshint(jshintrcFile))
        .pipe(plug.jshint.reporter('jshint-stylish'));
}



/**
 * Execute JSCS on given source files
 * @param  {Array} sources
 * @return {Stream}
 */
function analyzejscs(sources) {
    log('Running JSCS');
    return gulp
        .src(sources)
        .pipe(plug.jscs('./.jscsrc'));
}



/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer() {
    log('Running Plato');

    var files = glob.sync('./client/app/**/*.js');

    var excludeFiles = /\/client\/app\/.*\.spec\.js/;

    var options = {
        title: 'Plato Inspections Report',
        exclude: excludeFiles
    };
    var outputDir = './report/plato';

    plato.inspect(files, outputDir, options, platoCompleted);

    function platoCompleted(report) {
        var overview = plato.getOverviewReport(report);
        log(overview.summary);
    }
}



/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}



/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted percentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}



/**
 * Start the node server using nodemon.
 * Optionally start the node debugging.
 * @param  {Object} args - debugging arguments
 * @return {Stream}
 */
function serve(args) {
    var options = {
        script: paths.server + 'server.js',
        delayTime: 1,
        env: {
            'NODE_ENV': args.mode,
            'PORT': port
        },
        watch: [paths.server, paths.localApp]
    };

    var exec;
    if (args.debug) {
        log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        options.nodeArgs = [args.debug + '=5858'];
    }

    return plug.nodemon(options)
        .on('start', function() {
            log('Started!');
            startBrowserSync();
        })
        //.on('change', tasks)
        .on('restart', function() {
            log('Restarted!');
            setTimeout(function () {
                browserSync.reload({ stream: false });
            }, 1000);
        });
}



/**
 * Start BrowserSync
 */

function startBrowserSync() {

    if (browserSync.active) {
        reload();
        return;
    }
    else {
        log('Starting BrowserSync on port ' + port);
        browserSync.init({
            proxy: 'localhost:' + port,
            ws: true,
            port: 3000,
            files: [paths.client + '**/*.*'],
            ghostMode: { // these are the defaults t,f,t,t
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            logLevel: 'debug',
            logPrefix: 'gulp-patterns',
            notify: true,
            reloadDelay: 1000
        });
    }
}
