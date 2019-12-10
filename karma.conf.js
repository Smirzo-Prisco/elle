// Karma configuration
// Generated on Thu Sep 01 2016 16:50:02 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './client/bower_components/angular/angular.min.js',
        './client/bower_components/angular-mocks/angular-mocks.js',
        './client/bower_components/angular-cookies/angular-cookies.min.js',
        './client/bower_components/angular-animate/angular-animate.min.js',
        './client/bower_components/angular-touch/angular-touch.min.js',
        './client/bower_components/angular-sanitize/angular-sanitize.min.js',
        './client/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './client/bower_components/jquery/dist/jquery.min.js',
        './client/bower_components/fastclick/lib/fastclick.js',
        './client/bower_components/components-modernizr/modernizr.js',
        './client/bower_components/moment/min/moment.min.js',
        './client/bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js',
        './client/bower_components/bootstrap-daterangepicker/daterangepicker.js',
        './client/bower_components/sweetalert/lib/sweet-alert.min.js',
        './client/bower_components/spin.js/spin.js',
        './client/bower_components/ladda/dist/ladda.min.js',
        './client/bower_components/slick-carousel/slick/slick.min.js',
        './client/bower_components/chart.js/dist/Chart.min.js',
        './client/bower_components/ckeditor/ckeditor.js',
        './client/bower_components/jquery-nestable/jquery.nestable.js',
        './client/bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
        './client/bower_components/jquery-appear/build/jquery.appear.min.js',
        './client/bower_components/spectrum/spectrum.js',
        './client/bower_components/Jcrop/js/jquery.Jcrop.min.js',
        './client/bower_components/ngstorage/ngStorage.min.js',
        './client/bower_components/angular-translate/angular-translate.min.js',
        './client/bower_components/angular-translate-loader-url/angular-translate-loader-url.min.js',
        './client/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
        './client/bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
        './client/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
        './client/bower_components/oclazyload/dist/ocLazyLoad.min.js',
        './client/bower_components/angular-breadcrumb/dist/angular-breadcrumb.min.js',
        './client/bower_components/angular-swipe/dist/angular-swipe.min.js',
        './client/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        './client/bower_components/angular-loading-bar/build/loading-bar.min.js',
        './client/bower_components/angular-scroll/angular-scroll.min.js',
        './client/bower_components/angular-fullscreen/src/angular-fullscreen.js',
        './client/bower_components/ng-bs-daterangepicker/dist/ng-bs-daterangepicker.min.js',
        './client/bower_components/angular-truncate/src/truncate.js',
        './client/bower_components/angular-moment/angular-moment.min.js',
        './client/bower_components/angular-ui-switch/angular-ui-switch.min.js',
        './client/bower_components/AngularJS-Toaster/toaster.js',
        './client/bower_components/angular-aside/dist/js/angular-aside.min.js',
        './client/bower_components/v-accordion/dist/v-accordion.min.js',
        './client/bower_components/v-button/dist/v-button.min.js',
        './client/bower_components/angular-sweetalert-promised/SweetAlert.min.js',
        './client/bower_components/angular-notification-icons/dist/angular-notification-icons.min.js',
        './client/bower_components/angular-awesome-slider/dist/angular-awesome-slider.min.js',
        './client/bower_components/angular-ladda/dist/angular-ladda.min.js',
        './client/bower_components/angular-slick-carousel/dist/angular-slick.min.js',
        './client/bower_components/ng-notify/dist/ng-notify.min.js',
        './client/bower_components/ng-table/dist/ng-table.min.js',
        './client/bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
        './client/bower_components/angular-ui-utils/mask.min.js',
        './client/bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
        './client/bower_components/angular-file-upload/angular-file-upload.min.js',
        './client/bower_components/ngmap/build/scripts/ng-map.min.js',
        './client/bower_components/angular-chart.js/dist/angular-chart.min.js',
        './client/bower_components/ng-flow/dist/ng-flow-standalone.min.js',
        './client/bower_components/angular-ckeditor/angular-ckeditor.min.js',
        './client/bower_components/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js',
        './client/bower_components/ng-nestable/src/angular-nestable.js',
        './client/bower_components/angular-xeditable/dist/js/xeditable.min.js',
        './client/bower_components/checklist-model/checklist-model.js',
        './client/bower_components/ng-knob/dist/ng-knob.min.js',
        './client/bower_components/d3/d3.min.js',
        './client/bower_components/angular-appear/build/angular-appear.min.js',
        './client/bower_components/angular-count-to-0.1.1/dist/angular-filter-count-to.min.js',
        './client/bower_components/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js',

        './client/app/*.module.js',
        './client/app/**/*.module.js',
        './client/app/**/**/*.module.js',
        './client/app/**/*.js',
        './client/app/**/**/*.js',
        './client/app/**/*.specs.js',
        './client/app/**/**/*.specs.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
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


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
