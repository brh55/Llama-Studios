// Build Dependencies
var autoprefix  = require('autoprefixer');
var cssnano 	= require('cssnano');
var gulp        = require('gulp');
var postcss     = require('gulp-postcss');
var pcssEach    = require('postcss-each');
var precss		= require('precss');
var rename		= require('gulp-rename');
var reporter    = require('postcss-reporter');
var stylelint   = require('stylelint');
var browsersync = require('browser-sync')

gulp.task('build', function () {
    var processors = [
        precss(),
        pcssEach(),
    	autoprefix(),
        cssnano(),
        stylelint({
            "rules": {
                "string-quotes": [2, "double"],
                "color-hex-case": [2, "lower"],
                "selector-no-id": 2
            }
        }),
        reporter({
            clearMessages: true
        })
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
	    .pipe(rename('styles.min.css'))
	    .pipe(gulp.dest('.www/css'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: 'www/dist/',
    open: false
  });
  gulp.watch('src/css/**/*.css', ['css']);
  gulp.watch('www/**/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);