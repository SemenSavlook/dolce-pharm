/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const gulp = require('gulp');
const path = require('path');

// HTML
const fileInclude = require('gulp-file-include');
const htmlclean = require('gulp-htmlclean');
const webpHTML = require('gulp-webp-html');
const replace = require('gulp-replace');

// SASS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const webpCss = require('gulp-webp-css');
const groupMediaQueries = require('gulp-group-css-media-queries');

const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const rename = require('gulp-rename');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const TerserPlugin = require('terser-webpack-plugin');

// images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');


const changed = require('gulp-changed');

// Очитска папки dist
gulp.task('clean', function (done) {
  if (fs.existsSync('./dist/')) {
    return gulp
      .src('./dist/', { read: false })
      .pipe(clean({ force: true }));
  }
  done();
});

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Errpr<%= error.message %>',
      sound: false
    })
  }
}

// Вставка html частей, '!./src/*.html' - исключение
gulp.task('html', function () {
  return gulp
    .src([ './src/*.html' ])
    .pipe(changed('./dist/', { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(replace(/\.\.\//gi, ''))
    .pipe(gulp.dest('./dist'));
});

gulp.task('html:prod', function () {
  return gulp
    .src([ './src/*.html' ])
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(replace(/\.\.\//gi, ''))
    // .pipe(webpHTML())
    .pipe(htmlclean())
    .pipe(gulp.dest('./dist'));
});

// сборка css, из scss
gulp.task('scss', function () {
  return gulp
    .src('./src/scss/main.scss')
    .pipe(changed('./dist/'))
    .pipe(plumber(plumberNotify('Styles')))
    .pipe(sourceMaps.init())
    .pipe(sassGlob())
    // .pipe(groupMediaQueries())
    .pipe(sass())
    .pipe(sourceMaps.write())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('scss:prod', function () {
  return gulp
    .src('./src/scss/main.scss')
    .pipe(plumber(plumberNotify('Styles')))
    .pipe(sassGlob())
    // .pipe(webpCss())
    .pipe(sass())
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(groupMediaQueries())
    .pipe(csso())
    .pipe(rename('styles.css'))
    .pipe(gulp.dest('./dist/'))
});

// копирование папки img
gulp.task('images', function () {
  return gulp
    .src('./src/img/**/*')
    .pipe(changed('./dist/img/'))
    // .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./dist/img/'));
});

gulp.task('images:prod', function () {
  return gulp
    .src('./src/img/**/*')
    // .pipe(webp())
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest('./dist/img/'))
  // .pipe(gulp.src([ './dist/img/**/*.+(png|jpg|bmp|jpeg|jpeg2)', '!./dist/img/**/*.+(webp|svg)' ]))
  // .pipe(gulp.dest('./dist/img/'));
});

// копирование папки fonts
gulp.task('fonts', function () {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(changed('./dist/fonts/'))
    .pipe(gulp.dest('./dist/fonts/'));
});

// копирование папки files
gulp.task('files', function () {
  return gulp
    .src('./src/files/**/*')
    .pipe(changed('./dist/files/'))
    .pipe(gulp.dest('./dist/files/'));
});


// копирование из папки root в корень
gulp.task('filesToRoot', function () {
  return gulp
    .src('./src/toRoot/**/*')
    .pipe(changed('./dist/'))
    .pipe(gulp.dest('./dist/'));
});

// Обработка JS файлов

const configDev = {
  mode: 'development',
  entry: {
    index: './src/js/index.js',
    // несколько js файлов
    // contacts: './src/js/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      }
    ]
  }

}

const configProd = {
  mode: 'production',
  entry: {
    index: './src/js/index.js',
  },
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: '> 2%, not dead',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
      }
    ]
  },
  optimization: {
    minimizer: [ new TerserPlugin({
      terserOptions: {
        format: {
          comments: false,
        },
      },
      extractComments: false,
    }) ],
  }

}

gulp.task('js', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./dist/js/'))
    .pipe(plumber(plumberNotify('JS')))
    // .pipe(babel())
    .pipe(webpack(configDev))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('js:prod', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./dist/js/'))
    .pipe(plumber(plumberNotify('JS')))
    .pipe(babel())
    .pipe(webpack(configProd))
    .pipe(gulp.dest('./dist/js'))
});


// Liveserver
gulp.task('server', function () {
  return gulp
    .src('./dist/')
    .pipe(server({
      livereload: true,
      open: true
    }))
});

// 
gulp.task('watch', function () {
  gulp.watch('./src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('./src/**/*.html', gulp.parallel('html'));
  gulp.watch('./src/img/**/*.*', gulp.parallel('images'));
  gulp.watch('./src/img/**.*', gulp.parallel('fonts'));
  gulp.watch('./src/files/**.*', gulp.parallel('files'));
  gulp.watch('./src/js/**/*.*', gulp.parallel('js'));
});

// Дефолтный запуск
gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('filesToRoot', 'html', 'scss', 'images', 'fonts', 'files', 'js'),
  gulp.parallel('server', 'watch')
));

// Сборка prod
gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('filesToRoot', 'html:prod', 'scss:prod', 'images:prod', 'fonts', 'files', 'js:prod'),
));

// Сборка prod c предросмотром
gulp.task('build2', gulp.series(
  'clean',
  gulp.parallel('filesToRoot', 'html:prod', 'scss:prod', 'images:prod', 'fonts', 'files', 'js:prod'),
  gulp.parallel('server')
));