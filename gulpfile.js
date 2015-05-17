var gulp = require('gulp')
var del = require('del')

gulp.task('clean', function () {
  del(['build/*.js', 'build/*.css'], function (err, deletedFiles) {
    if (err) throw console.log('Error')
    console.log('Files deleted:', deletedFiles.join(', '))
  })
})
