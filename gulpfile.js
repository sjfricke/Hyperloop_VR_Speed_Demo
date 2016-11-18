var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var strip = require('gulp-strip-comments');
var concat = require('gulp-concat');
var beautify = require('gulp-beautify');
var pump = require('pump');

gulp.task('default', function() {    
    
    pump([
        gulp.src([
            'public/lib/es6-promise.js', 
            'public/lib/three.js', 
            'public/lib/VRControls.js', 
            'public/lib/VREffect.js', 
            'public/lib/webvr-polyfill/build/webvr-polyfill.js', 
            'public/lib/webvr-manager.js', 
            'public/lib/Detector.js', 
            'public/javascript/room.js', 
            'public/javascript/roomLogic.js', 
            'public/javascript/GeometryFunctions.js', 
            'public/javascript/EventFunctions.js', 
            'public/javascript/main.js']),
        strip(),
        uglify(),
        concat('all.js'),
        gulp.dest('public/javascript')
    ]
    );    
    
});

gulp.task('tour', function() {
    
    
    pump([
        gulp.src('public/tour_dev.html'),
        strip(),
        htmlmin({collapseWhitespace: true}),
        concat('tour.html'),
        gulp.dest('public')
    ]
    );    
    
    
});
 
gulp.task('index', function() {
    
    pump([
            gulp.src('public/index_dev.html'),
            strip(),
            htmlmin({collapseWhitespace: true}),
            concat('index.html'),
            gulp.dest('public')
        ]
        );
    
})

gulp.task('room', function() {
  gulp.src('public/javascript/room3.js')
    .pipe(beautify({indentSize: 2}))  
    .pipe(concat('room2.js'))
    .pipe(gulp.dest('public/javascript/'))
});


