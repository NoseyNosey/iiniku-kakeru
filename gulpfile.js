const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");

// パスの設定
const paths = {
  scss: "scss/style.scss",      // SCSSのメインファイル
  scssWatch: "scss/**/*.scss",  // 監視対象のSCSS
  cssDest: "assets/css/"        // CSSの出力先
};

// SCSSをコンパイルしてCSSに変換
function compileSass() {
  return src(paths.scss)
    .pipe(sourcemaps.init()) // ソースマップ開始
    .pipe(sass().on("error", sass.logError)) // SCSSをコンパイル
    .pipe(postcss([autoprefixer()])) // ベンダープレフィックス追加
    .pipe(dest(paths.cssDest)) // `assets/css/` に保存
    .pipe(cleanCSS()) // CSSを圧縮
    .pipe(rename({ suffix: ".min" })) // `style.min.css` にリネーム
    .pipe(sourcemaps.write(".")) // ソースマップを書き出し
    .pipe(dest(paths.cssDest)); // `assets/css/` に圧縮版を保存
}

// SCSSの変更を監視してリアルタイム更新
function watchFiles() {
  watch(paths.scssWatch, compileSass);
}

// デフォルトタスク (`gulp` で実行される)
exports.default = series(compileSass, watchFiles);
