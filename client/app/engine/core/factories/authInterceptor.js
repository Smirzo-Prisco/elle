(function() {

    'use strict';

    angular.module('app.engine.core')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$q', '$injector'];

    function authInterceptor($q, $injector) {
        return {
            // On request success
            request: function (config) {
                // Return the config or wrap it in a promise if blank.
                return config || $q.when(config);
            },

            // On request failure
            requestError: function (rejection) {
                $injector.get('logger').error('Request error', "Generic request error", rejection);
                // Return the promise rejection.
                return $q.reject(rejection);
            },

            // On response success
            response: function (response) {
                // Return the response or promise.
                return response || $q.when(response);
            },

            // On response failture
            responseError: function (rejection) {
                /*
                 * intercept 401 Not unauthorized status code
                 * clear all userData
                 * go to login state
                 */
                if(rejection.status === 401) {
                    $injector.get('CoreService').clearUserData();
                    $injector.get('$state').go('auth.login', {isError: true});
                }
                $injector.get('logger').error(rejection.data.err, rejection.statusText, rejection);
                return $q.reject(rejection);
            }
        };
    }




})();