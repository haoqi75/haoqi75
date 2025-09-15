const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const { rm, mkdir } = require('fs/promises');

// 清理输出目录
async function clean() {
  try {
    await rm('page', { recursive: true, force: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
  // 创建 page 目录
  await mkdir('page', { recursive: true });
}

// 合并和压缩 CSS 文件
function processCSS() {
  return gulp.src('assets/css/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('page'));
}

// 合并和压缩 JS 文件（排除 script.js）
function processJS() {
  return gulp.src([
      'assets/js/*.js',
      '!assets/js/script.js'
    ])
    .pipe(concat('head.js'))
    .pipe(uglify())
    .pipe(gulp.dest('page'));
}

// 复制 script.js
function copyScriptJS() {
  return gulp.src('assets/js/script.js')
    .pipe(gulp.dest('page'));
}

// 复制图片文件
function copyImages() {
  return gulp.src('assets/img/**/*', { encoding: false })
    .pipe(gulp.dest('page'));
}

// 复制 HTML 文件
function copyHTML() {
  return gulp.src(['index.html', '404.html'])
    .pipe(gulp.dest('page'));
}

// 构建任务
const build = gulp.series(
  clean,
  gulp.parallel(
    processCSS,
    processJS,
    copyScriptJS,
    copyImages,
    copyHTML
  )
);

exports.clean = clean;
exports.build = build;
exports.default = build;