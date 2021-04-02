var browserifyBundler, copyResources, buildStyles, buildApp, packageApp,
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    $ = gulpLoadPlugins({}),
    uglifyEs = require('gulp-uglify-es').default;
    log = require('color-log'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    watchify = require('watchify'),
    browserify = require('browserify'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    environment = $.util.env.type || 'development',
    fs = require('fs'),
    pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8')),
    port = require('./server/props').port,
    paths = {
      app: 'app',
      dist: 'dist'
    };

/* Browserify bundler */
watchify.args.debug = ($.util.env.type !== 'production');
browserifyBundler = browserify(watchify.args);

/* Empty the paths.dist directory */
gulp.task('clean', function() {
  return gulp.src(paths.dist, {read: false})
    .pipe($.rimraf());
});

/* Copy all resources to dist */
copyResources = function() {
  log.mark('Copying resources...');
  return gulp.src([
      paths.app + '/**/*.*',
      '!' + paths.app + '/**/*.+(js|hbs|scss)',
    ])
    .pipe(gulp.dest(paths.dist));
};

gulp.task('copy-resources', copyResources);

/* Build all styles */
buildStyles = function() {
  return gulp.src([paths.app + '/**/*.scss'])
  .pipe($.sass({
    includePaths: []
  }).on('error', $.sass.logError))
  .pipe($.concatUtil('app.css'))
  .pipe(environment === 'production' ? $.cssmin() : $.util.noop())
  .pipe(gulp.dest(paths.dist))
  .pipe(environment !== 'production' ? browserSync.reload({stream: true}) : $.util.noop())
  .pipe(environment !== 'production' ? $.notify('Build Styles Complete') : $.util.noop());
};
gulp.task('build-styles', buildStyles);

/* Reduce all javascript to app.js */
buildApp = function() {
  return browserifyBundler.bundle()
    .on('error', function(err, b) {
      delete err.stream;
      log.error('[ERROR] {Browserify} @ ' + (new Date()));
      log.warn(err.toString());
      return true;
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(environment !== 'production' ? $.sourcemaps.init({loadMaps: true}) : $.util.noop())
    .pipe(environment === 'production' ? $.stripDebug() : $.util.noop())
    .pipe(environment === 'production' ? uglifyEs() : $.util.noop())
    .pipe(environment !== 'production' ? $.sourcemaps.write('./') : $.util.noop())
    .pipe(gulp.dest(paths.dist))
    .pipe(environment !== 'production' ? browserSync.reload({stream: true}) : $.util.noop())
};
gulp.task('build-app', buildApp);

/* Full build */
gulp.task('build', function(callback) {
  browserifyBundler.add('./' + paths.app + '/main');
  browserifyBundler.transform('aliasify', {global: true});
  browserifyBundler.transform('hbsfy');
  browserifyBundler.transform('envify', {
    NODE_ENV: environment,
    version: pkg.version
  });
  runSequence('clean',
    [
      'copy-resources',
      'build-styles',
      'build-app'
    ],
    callback);
});

/*----------  Start Browser Sync  ----------*/

gulp.task('serve', function() {
  browserSync({
    proxy: `localhost:${port}`,
    port: '3001',
    open: false
  });
});


/* Watch build */
gulp.task('watch', function() {
  browserifyBundler = watchify(browserifyBundler);
  browserifyBundler.on('update', buildApp);
  browserifyBundler.on('log', function(err) {
    log.mark('[SUCCESS] {Javascript} ' + err.toString());
  });
  gulp.start('build', function() {
    gulp.watch(paths.app + '/**/*.scss', buildStyles);
    gulp.watch([
      paths.app + '/**/*.*',
      '!' + paths.app + '/**/*.+(hbs|js|scss)',
    ], copyResources);
  });
  gulp.start('serve');

});