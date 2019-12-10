(function() {

    'use strict';

    angular.module('app.engine.layout')
        .directive('menu', menu)

    menu.$inject = [];

    /**
     * menu
     */
    function menu() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/engine/layout/directives/templates/menu.html',
            scope: {
                // creates a scope variable in your directive
                // called `features` bound to whatever was passed
                // in via the `features` attribute in the DOM
                features: '=features'
            },
            link: function(scope, element, attrs) {

            }
        };
    };

})();