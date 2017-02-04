const gulp = require("gulp"),
      scss = require("gulp-sass"),
      del  = require("del"),
      include = require("gulp-file-include"),
      browserSync = require("browser-sync").create();

let path = {
    build: {
        html: "build/",
        style: "build/style/",
        js: "build/js/",
        img: "build/img/",
        fonts: "build/fonts/"
    },

    watch: {
        html: "src/**/*.html",
        style: "src/style/**/*.scss",
        js: "src/js/**/*.js",
        img: "src/img/**/*.*",
        fonts: "src/fonts/**/*.*"
    },

    src: {
        html: "src/*.html",
        style: "src/style/*.scss",
        js: "src/js/**/*.js",
        img: "src/img/*.*",
        fonts: "src/fonts/**/*.*"
    },

    del: "build/**/*"
}

// TASKS

// ***** BUILD *****

// build html
gulp.task("build:html", () => {
    gulp.src(path.src.html)
        // включить файлы в главный файл
        .pipe(include({
            prefix: "@@"
        }))
        .pipe(gulp.dest(path.build.html));
});

// build style
gulp.task("build:style", () => {
    gulp.src(path.src.style)
        .pipe(scss().on("error", scss.logError))
        //add autoprefixer
        //add minify
        .pipe(gulp.dest(path.build.style));
});


// build js
gulp.task("build:js", () => {
    gulp.src(path.src.js)
        // включить файлы в главный файл
        .pipe(include({
            prefix: "@@"
        }))
        // uglify
        .pipe(gulp.dest(path.build.js));
});

// copy images from src to build
gulp.task("build:img", () => {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img));
});

// copy fonts from src to build
gulp.task("build:fonts", ()=> {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task("build", () => {
    gulp.start("build:html");
    gulp.start("build:style");
    gulp.start("build:js");
    gulp.start("build:img");
    gulp.start("build:fonts");
});

// ***** WATCH HANDLERS *****

gulp.task("watch:html", ["build:html"], (done) => {
    browserSync.reload();
    done();
});

gulp.task("watch:style", ["build:style"], (done) => {
    browserSync.reload();
    done();
});

gulp.task("watch:js", ["build:js"], (done) => {
    browserSync.reload();
    done(); 
});

gulp.task("watch:img", ["build:img"], (done) => {
    browserSync.reload();
    done();    
});

gulp.task("watch:fonts", ["build:fonts"], (done) => {
    browserSync.reload();
    done();    
});


// ***** SPECIAL *****

// удалить содержимое папки для сборки
gulp.task("del", () => {
    return del([path.del]);
});

// удалить и собрать проект
gulp.task("delAndBuild", ["del"], () => {
    gulp.start("build");
});

// run server and watch
gulp.task("serve", (done) => {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    // enable watch
    gulp.watch(path.watch.html, ["watch:html"]);
    gulp.watch(path.watch.style, ["watch:style"]);
    gulp.watch(path.watch.js, ["watch:js"]);
    gulp.watch(path.watch.img, ["watch:img"]);
    gulp.watch(path.watch.fonts, ["watch:fonts"]);

    done();
});


// ***** DEFAULT *****

gulp.task("default", ["delAndBuild"], () => {
    gulp.start("serve");
});


