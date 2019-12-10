(function() {
    'use strict';

    var profile = angular.module('app.profile', [
        'angularFileUpload',
        'ngImgCrop'
    ]);

    profile.run(function(editableOptions, editableThemes) {
        editableOptions.theme = 'bs3';
    });


})();

