(function() {
    'use strict';

    var core = angular.module('app.engine.core', [
        'ngCookies',
        'ngStorage',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'angularMoment',
        'oc.lazyLoad',
        'ncy-angular-breadcrumb'
    ]);

    core.run(['$rootScope', '$state', '$stateParams', 'CoreService',
        function ($rootScope, $state, $stateParams, CoreService) {

            // Set some reference to access them from any scope
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            // GLOBAL APP SCOPE
            // set below basic information
            // init app variable assigne to rootScope
            $rootScope.app = {};

        }
    ]);

    // ng-storage
    //set a prefix to avoid overwriting any local storage variables
    core.config(['$localStorageProvider', '$httpProvider', '$breadcrumbProvider',
        function ($localStorageProvider, $httpProvider, $breadcrumbProvider) {
            $localStorageProvider.setKeyPrefix('LaLu-');

            //Auth Interceptor pushing in $http provider
            $httpProvider.interceptors.push('authInterceptor');

            //DISABLING CACHE FOR ALL HTTP GET REQUEST
            $httpProvider.defaults.cache = false;
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            // disable IE ajax request caching
            $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

            //Force to include abstract states into breadcrumb
            $breadcrumbProvider.setOptions({
                includeAbstract: true
            });
        }
    ]);

    //filter to convert html to plain text
    core.filter('htmlToPlaintext', function () {
            return function (text) {
                return String(text).replace(/<[^>]+>/gm, '');
            };
        }
    );
})();