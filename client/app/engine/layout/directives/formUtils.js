(function() {

    'use strict';

    angular.module('app.engine.layout')
        .directive('passwordMatch', passwordMatch);


    /**
     * passwordMatch
     */
    function  passwordMatch() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, controller) {
                var checker = function () {
                    var e1 = scope.$eval(attrs.ngModel);
                    var e2 = scope.$eval(attrs.passwordMatch);
                    return (!e1 && !e2) || e1 == e2;
                };

                scope.$watch(checker, function (n) {
                    controller.$setValidity('passwordMatch', n);
                });
            }
        };
    }

})();
