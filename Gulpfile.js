var gulp    = require('gulp');
var gutil   = require('gutil');
var sync    = require('run-sequence');
var browser = require('browser-sync');
var webpack = require('webpack');
var todo    = require('gulp-todoist');
var path    = require('path');
var yargs   = require('yargs').argv;
var tpl     = require('gulp-template');
var rename  = require('gulp-rename');
var flatten = require('gulp-flatten');
var plumber = require('gulp-plumber');
var WebpackDevServer = require("webpack-dev-server");
/*
map of paths for using with the tasks below
 */
var paths = {
  entry : ['./client/app/boot.ts'],
  app: ['client/app/**/*.{ts,styl,html}', 'client/styles/**/*.styl'],
  js: 'client/app/**/*!(.spec.js).js',
  styl: ['client/app/**/*.styl', 'client/style/**/*.styl'],
  toCopy: ['client/index.html','client/index-electron.html','client/app/electron/main.js'],
  html: ['client/index.html', 'client/app/**/*.html'],
  dest: 'dist',
  blankTemplates: 'templates/component/*.**'
};

// helper funciton
var resolveToComponents = function(glob){
  glob = glob || '';
  return path.join('client', 'app/components', glob); // app/components/{glob}
};

gulp.task('todo', function() {
  return gulp.src(paths.js)
    .pipe(todo({silent: false, verbose: true}));
});

gulp.task('build', ['todo'], function() {
    return gulp.src(paths.entry)
    .pipe(plumber())
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.dest));
});
gulp.task('dev-build', ['todo'],function() {
  return gulp.src(paths.entry)
  .pipe(webpackDevServer(require('./webpack.config'), {
    hot:true,
    colors:true,
    inline:true,
    watch:true,
    historyApiFallback: true

  }))
  .pipe(gulp.dest(paths.dest));
});

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options

	// Start a webpack-dev-server
  var myConfig = require('./webpack.config');
  console.log(myConfig);
  myConfig.entry = paths.entry;
  myConfig.entry.unshift("webpack-dev-server/client?http://localhost:4500/");
 // myConfig.context =  __dirname + '/';


	new WebpackDevServer(webpack(myConfig), {
    contentBase: 'client/',
    historyApiFallback: true,
		stats: {
			colors: true
		}
	}).listen(4500, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:4500/webpack-dev-server/index.html");
	});
});

gulp.task('serve', function() {
  browser({
    port: process.env.PORT || 4500,
    open: false,
    ghostMode: false,
    server: {
      baseDir: 'dist'
    }
  });
});

/*
simple task to copy over needed files to dist
 */
gulp.task('copy', function() {
  return gulp.src(paths.toCopy, { base: 'client' })
    .pipe(flatten())
    .pipe(gulp.dest(paths.dest));
});

/*
task to watch files for changes and call build and copy tasks
 */
gulp.task('watch', function() {
  gulp.watch(paths.app, ['build', browser.reload]);
  gulp.watch(paths.toCopy, ['copy', browser.reload]);
});

gulp.task('component', function(){
  var cap = function(val){
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  var name = yargs.name;
  var parentPath = yargs.parent || '';
  var destPath = path.join(resolveToComponents(), parentPath, name);

  return gulp.src(paths.blankTemplates)
    .pipe(tpl({
      name: name,
      upCaseName: cap(name)
    }))
    .pipe(rename(function(path){
      path.basename = path.basename.replace('component', name);
    }))
    .pipe(gulp.dest(destPath));
});
gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});
gulp.task('electron', function(done){
  sync('build','copy',done)
});
gulp.task('dev', function(done){
sync('set-dev-node-env','webpack-dev-server',done)
});
gulp.task('default', function(done) {
  sync('set-dev-node-env','build', 'copy', 'serve', 'watch', done)
});
