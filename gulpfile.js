const { series, src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');   
const rev = require('gulp-rev');

const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');



 function css(cb) {
    // place code for your default task here
    console.log('minifing csss');
    src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(dest('./assets/css'));



    return src('./assets/**/*.css')
    .pipe(rev())
    .pipe(dest('./public/assets'))
      .pipe(
        rev.manifest({
          base: 'public',
          merge: true          })
        )
        .pipe(dest('./public/assets'));

        cb();
  }
  
  function js(cb){
    console.log('minifying js...');
    src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(dest('./public/assets'));
    cb();
  }

  function images(cb)
  {
    console.log('compressing images...');
    src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(dest('./public/assets'));

    cb();
  }

  function clean(cb){
    del.sync('./public/assets');
    cb();
  }

  // exports.default = css;


  exports.build = series(clean,css, js, images);


