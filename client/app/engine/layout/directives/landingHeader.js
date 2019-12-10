(function() {

    'use strict';

    angular.module('app.engine.layout')
        .directive('landingHeader', landingHeader);

    landingHeader.$inject = ['$window'];

    /**
     * landingHeader
     */
    function landingHeader($window) {

        return {
            restrict: 'A',
            link: function ($scope, $element, $attributes) {
                angular.element($window).bind('scroll', function () {
                    if (this.pageYOffset >= 60) {
                        $element.addClass('min');
                    } else {
                        $element.removeClass('min');
                    }
                });

            }
        };

    }

})();
