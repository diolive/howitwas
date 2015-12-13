/// <binding AfterBuild='clean, copy' Clean='clean' ProjectOpened='sass:watch, ts:watch' />

"use scrict";

var gulp = require('gulp'),
    fs = require('fs'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    typescript = require('gulp-typescript'),
    git = require('gulp-git'),
    bump = require('diolive-bump');

var root = './wwwroot/',
    paths = {
      bower: './bower_components/',
      webroot: root,

      css: root + 'css',
      js: root + 'js',
      lib: root + 'lib',
      sass: './SASS',
      ts: './TypeScript',

      settings: 'appsettings.json'
    };

paths.cssFiles = paths.css + '/**/*.css';
paths.jsFiles = paths.js + '/**/*.js';
paths.sassFiles = paths.sass + '/**/*.scss';
paths.tsFiles = paths.ts + '/**/*.ts';

paths.ts_d = paths.ts + '/d';
paths.ts_global = paths.ts + '/global';
paths.ts_auth = paths.ts + '/auth';

paths.dts = paths.ts_d + '/*.d.ts';

gulp.task('clean:js', function (cb) {
  rimraf(paths.js, cb);
});

gulp.task('clean:css', function (cb) {
  rimraf(paths.css, cb);
});

gulp.task('clean:lib', function (cb) {
  rimraf(paths.lib, cb);
});

gulp.task('clean', ['clean:js', 'clean:css', 'clean:lib']);

gulp.task('ts:global', function () {
  gulp.src([paths.dts,
            paths.ts_global + '/checkActiveMenuItem.ts',
            paths.ts_global + '/enableMenulikeDropdowns.ts'])
    .pipe(typescript())
    .pipe(concat(paths.js + '/global.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('ts:auth', function () {
  gulp.src([paths.dts,
            paths.ts_auth + '/login.ts'])
    .pipe(typescript())
    .pipe(concat(paths.js + '/auth.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('ts', ['ts:global', 'ts:auth']);

gulp.task('sass', function () {
  gulp.src([paths.sassFiles])
      .pipe(sass())
      .pipe(cssmin())
      .pipe(gulp.dest(paths.webroot + 'css'));
});

gulp.task('lib', function () {
  var bower = {
    'angular': 'angular/angular.min.js',
    'hammer': 'hammer.js/hammer.min.js',
    'jquery': 'jquery/dist/jquery.min.js',
    'semantic-ui': 'semantic-ui/dist/{semantic.min.{js,css},themes/**/*}'
  };

  for (var dest in bower) {
    gulp.src(paths.bower + bower[dest])
        .pipe(gulp.dest(paths.lib + '/' + dest));
  }
});

gulp.task('copy', ['ts', 'sass', 'lib']);

gulp.task('min', ['min:css', 'min:js']);

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(paths.sassFiles, ['sass']);
});

gulp.task('ts:watch', ['ts'], function () {
  gulp.watch(paths.tsFiles, ['ts']);
});

gulp.task('bump:patch', function () {
  git.revParse({ args: '--short HEAD' }, function (err, hash) {
    if (!err) {
      gulp.src(paths.settings)
          .pipe(bump([
            { version: hash, key: 'Data.GitHash' },
            { type: 'patch', key: 'Data.Version' }
          ]))
          .pipe(gulp.dest('./'));
    }
  });
});

gulp.task('bump:minor', function () {
  git.revParse({ args: '--short HEAD' }, function (err, hash) {
    if (!err) {
      gulp.src(paths.settings)
          .pipe(bump([
            { version: hash, key: 'Data.GitHash' },
            { type: 'minor', key: 'Data.Version' }
          ]))
          .pipe(gulp.dest('./'));
    }
  });
});

gulp.task('bump:gitonly', function () {
  git.revParse({ args: '--short HEAD' }, function (err, hash) {
    if (!err) {
      gulp.src(paths.settings)
          .pipe(bump(
            { version: hash, key: 'Data.GitHash' }
          ))
          .pipe(gulp.dest('./'));
    }
  });
});