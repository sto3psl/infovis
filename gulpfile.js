var postcss = require('gulp-postcss')
var gulp = require('gulp')
var rename = require('gulp-rename')
var autoprefixer = require('autoprefixer-core')
var mqpacker = require('css-mqpacker')
var csswring = require('csswring')
var cssnext = require('cssnext')
var cssimport = require('postcss-import')
var del = require('del')
var browserify = require('browserify')
var source = require('vinyl-source-stream')

gulp.task('css', function () {
  var processors = [
    cssnext(),
    autoprefixer({browsers: ['last 1 version']}),
    mqpacker,
    csswring,
    cssimport
  ]
  return gulp.src('./style/style.css')
    .pipe(postcss(processors))
    .pipe(rename('app.build.css'))
    .pipe(gulp.dest('./build'))
})

gulp.task('clean', function () {
  del(['build/*.js', 'build/*.css'], function (err, deletedFiles) {
    if (err) throw console.log('Error')
    console.log('Files deleted:', deletedFiles.join(', '))
  })
})

gulp.task('build-js', function () {
  return browserify('./index.js', { debug: true })
    .transform(require('jadeify'))
    .bundle()
    .pipe(source('app.build.js'))
    .pipe(gulp.dest('./build/'))
})
