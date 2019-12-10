(function() {

    'use strict';

    angular.module('app.engine.layout')
        .directive('ctDismiss', ctDismiss);


    /**
     * charLimit
     */
    function ctDismiss() {

        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.on('click', function (e) {
                    elem.parent('.' + attrs.ctDismiss).hide();
                    e.preventDefault();
                });

            }
        };

    }

})();
