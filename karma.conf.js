// Karma configuration
// Generated on Sun Jul 19 2015 17:24:36 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        'app/libs/react.js',
        'app/libs/react-dom.js',
	'specs/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
        'specs/libs/*.*',
        'specs/libs/**/*.*'
        //'node_modules/**'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
	//"app/js/*.js$":['babel','webpack'],
	//"app/js/*.jsx$":['babel','webpack'],
	"/Users/i074615/Documents/GitHub/diagram/specs/*.spec.js":['webpack','sourcemap']
    },
      webpack:{
	  devtool:'inline-source-map',
	  module:{
	      loaders:[
		  {
		      exclude:/node_modules/,
		      loader:'babel-loader',
		      test:/\.jsx?$/
		  }
	      ]
	  }
      },
      webpackMiddleware: {
	  noInfo: true,
      },
      babelPreprocessor:{
	  options:{
	      presets: ['es2015','react'],
	      sourceMap:'inline'
	  },
	  filename: function (file) {
	      return file.originalPath;
              return file.originalPath.replace(/\.js$/, '.es5.js');
	  },
	  sourceFileName: function (file) {
              return file.originalPath;
	  }
      },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers - Chrome,PhantomJS
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
