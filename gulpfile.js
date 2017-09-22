// @noflow
/* eslint-disable arrow-body-style, comma-dangle, import/no-extraneous-dependencies */
/* eslint comma-dangle: ["error", { "functions": "never" }] */

const gulpHelp = require('gulp-help');
const gulp = gulpHelp(require('gulp'));

const cache = require('gulp-cached');
const eslint = require('gulp-eslint');

const { spawn } = require('child_process');
const { throttle } = require('lodash');
const clear = require('clear');
const path = require('path');
const Stream = require('stream');
const bump = require('gulp-bump');
const gutil = require("gulp-util");

const PROJECT_ROOT = path.resolve(__dirname);

const DEFAULT_WATCHMAN_CONFIG = {
  expression: [
    'allof',
    ['match', '**/*', 'wholename', { includedotfiles: true }],
    ['type', 'f'],
    ['not', ['match', '.git', 'basename']],
    ['not', ['match', '.git/**/*', 'wholename', { includedotfiles: true }]],
    ['not', ['match', 'flow-coverage', 'basename']],
    ['not', ['match', 'flow-coverage/**/*', 'wholename', { includedotfiles: true }]],
    ['not', ['match', 'coverage', 'basename']],
    ['not', ['match', 'coverage/**/*', 'wholename', { includedotfiles: true }]],
    ['not', ['match', 'node_modules', 'basename']],
    ['not', ['match', 'node_modules/**/*', 'wholename', { includedotfiles: true }]],
    ['not', ['match', '*/node_modules/**/*', 'wholename', { includedotfiles: true }]],
    ['not', ['match', '**/*.unexpected-snap', 'wholename']],
  ],
};

const DEFAULT_JS_FILES_TO_WATCH = [
  './index.*.js',
  './__tests__/**/*.js',
  './tests/**/*.js',
  './src/**/**/*.js',
];

function spawnAndPipe(command, args, options, cb) {
  const child = spawn(command, args, options);
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  if (cb) {
    child.on('close', () => {
      cb();
    });
  }

  return child;
}

const onFileChange = (changeCallback) => {
  const stream = new Stream.Transform({ objectMode: true });

  // eslint-disable-next-line no-underscore-dangle
  stream._transform = (file, _, callback) => {
    const { cwd, relative, stat } = file;

    changeCallback(path.join(cwd, relative), stat, callback);
  };
  return stream;
};

gulp.task('clear', () => {
  clear();
});

// - flow - //

gulp.task('flow:watch', () => {
  clear();
  gutil.log("================FLOW:WATCH");
  gulp.start('flow');
   gulp.watch(DEFAULT_JS_FILES_TO_WATCH).on('change', () => {
     clear();
     gutil.log("================FLOW:WATCH");
     gulp.start('flow');
   });
});

gulp.task('flow', (cb) => {
  spawnAndPipe(
    `${PROJECT_ROOT}/node_modules/.bin/flow`,
    ['--color', 'always', '--quiet'],
    undefined,
    cb
  );
});

// ~ flow ~ //

// - eslint - //

const ESLINT_CACHE_NAME = 'eslint';
const ESLINT_WATHC_FILES = [
  './.eslint*',
  './gulpfile.js',
  ...DEFAULT_JS_FILES_TO_WATCH,
];

function createEslintTask({ failAfterError }) {
  const gulpStrem = gulp.src(ESLINT_WATHC_FILES)
    .pipe(cache(ESLINT_CACHE_NAME))
    .pipe(eslint())
    .pipe(eslint.format(undefined, process.stdout))
    .pipe(eslint.result((result) => {
      if (result.warningCount > 0 || result.errorCount > 0) {
        delete cache.caches[ESLINT_CACHE_NAME][path.resolve(result.filePath)];
      }
    }))
    .on('finish', () => {
      process.stdout.write('All done!\n');
    });

  if (!failAfterError) {
    return gulpStrem;
  }

  return gulpStrem
    .pipe(eslint.failAfterError());
}

gulp.task('eslint:watch', () => {
  clear();
  gutil.log("================ESLINT:WATCH");
  gulp.start('eslint')
   gulp.watch(DEFAULT_JS_FILES_TO_WATCH).on('change', () => {
     clear();
     gutil.log("================ESLINT:WATCH");
     gulp.start('eslint')
   });
});

gulp.task('eslint', () => {
  return createEslintTask({ failAfterError: true });
});

gulp.task('eslint:nofail', () => {
  clear();
  return createEslintTask({ failAfterError: false });
});

const throttledClearEslint = throttle(() => {
  clear();
  gulp.start('eslint');
}, 200);

// ~ eslint ~ //

// - react-scripts - //

const PATH_TO_REACT_SCRIPTS = ['./packages/react-scripts/**/*', './packages/react-scripts/**/.*'];
const PATH_TO_RS_NODE_MODULES = './node_modules/react-scripts';

gulp.task('rs:copy', () => {
  gulp.src(PATH_TO_REACT_SCRIPTS)
    .pipe(gulp.dest(PATH_TO_RS_NODE_MODULES));
});

gulp.task('bump', () => {
  gulp
    .src('./package.json')
    .pipe(bump())
    .pipe(gulp.dest('./'));
});
gulp.task('bump:minor', () => {
  gulp
    .src('./package.json')
    .pipe(bump({ type: 'minor' }))
    .pipe(gulp.dest('./'));
});
gulp.task('bump:major', () => {
  gulp
    .src('./package.json')
    .pipe(bump({ type: 'major' }))
    .pipe(gulp.dest('./'));
});

gulp.task('rs:watch', ['rs:copy'], () => {
  gulp.watch(PATH_TO_REACT_SCRIPTS, ['rs:copy']);
});

// ~ react-scripts ~ //
