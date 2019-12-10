(function() {

    'use strict';

    angular.module('app.engine.layout')
        .directive('a', emptyLinks);


    /**
     * Prevent default action on empty links.
     */
     function emptyLinks () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function (e) {
                        e.preventDefault();
                    });
                }
            }
        };
    }
})();