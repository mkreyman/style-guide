var browserSync = require('browser-sync').create();
var del         = require('del');
var fileinclude = require('gulp-file-include');
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var sass        = require('gulp-sass');


// Removes current build (dist) and performs all build tasks (tasks prefixed with "build-")
gulp.task('build', ['build:assets','build:css-assets','build:html', 'build:sass', 'build:scripts']);

// Build assets from src to dist
gulp.task('build:assets', function(){
  return gulp.src("src/assets/**/*")
    .pipe(gulp.dest("dist/assets"))
    .pipe(browserSync.stream());
});

// Build css from src to dist
gulp.task('build:css-assets', function(){
  return gulp.src("src/css/**/*.!(css)")
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

// Compiles and copies all html files to dist
gulp.task('build:html', function(){
  return gulp.src("src/pages/**/*.html")
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest("dist/pages"));
});

// Compiles SASS files into CSS & auto-injects into browsers
gulp.task('build:sass', function() {
    return gulp.src("src/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Copies all javascript files to dist
gulp.task('build:scripts', function(){
  return gulp.src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"));
});

// Removes dist and everything inside
gulp.task('clean', function (cb) {
  return del([
    'dist/',
  ], cb);
});



// Default task that is used when none are specified; performs the html, fonts,
//scripts, and serve tasks
gulp.task('default', function(cb){
  runSequence('clean','build','serve',cb);
});

// Launches a static server, watches dev files for changes, builds dist
// on change, performs autoreload/injections on any browsers that have the
// the site loaded
gulp.task('serve', function() {

    browserSync.init({
        open: false,
        server: {
          baseDir: "./dist"
        },
        notify: false
    });

    gulp.watch("src/scss/**/*.scss", ['build:sass']);
    gulp.watch("src/pages/**/*.html", ['build:html']);
    gulp.watch("src/js/**/*.js", ['build:scripts']);
    gulp.watch("src/css/**/*.!(css)", ['build:css-assets']);
    gulp.watch("src/assets/**/*", ['build:assets']);

    gulp.watch("dist/pages/**/*.html").on('change', browserSync.reload);
    //gulp.watch("dist/assets/**/*").on('change', browserSync.reload);
    //gulp.watch("dist/css/img/**/*").on('change', browserSync.reload);
    //gulp.watch("dist/css/icons/**/*").on('change', browserSync.reload);
    gulp.watch("dist/js/**/*.js").on('change', browserSync.reload);
});

gulp.task('serve:sass', function() {

    browserSync.init({
        open: false,
        server: {
          baseDir: "./dist"
        },
        notify: false
    });

    gulp.watch("src/scss/**/*.scss", ['build-sass']);
    gulp.watch("src/**/*.html", ['build-html']);
    gulp.watch("dist/**/*.html").on('change', browserSync.reload);
});
