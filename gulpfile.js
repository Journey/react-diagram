var gulp = require('gulp');
//var livereload = require('gulp-livereload');
var gls = require('gulp-live-server');
var cp = require('child_process');
//const template = require('gulp-template');
//var karma = require("gulp-karma");

gulp.task("default", function() {
    // body...
});

gulp.task('server', function() {
    cp.execFile("startServer.bat", {
            cwd: "./shells"
        },
        function(error, stdout) {
            if (error !== null) {
                console.log("error when start server:" + error);
            } else {
                console.log("stdout:" + stdout);
            }
        });
});

var files = [];
gulp.task("test", function() {
    return gulp.src(files)
        .pipe(karma({
            configFile: "karma.config.js",
            action: 'run'
        }))
        .on("error", function(err) {
            throw err;
        });
});

gulp.task("watch", function() {
    return gulp.src(files)
        .pipe(karma({
            configFile: "karma.config.js",
            action: 'watch'
        }));
});
