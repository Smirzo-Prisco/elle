(function() {

    angular
        .module('app.engine.core')
        .factory('AuthService', authService);

    authService.$inject = ['$http', '$q', 'CoreService'];

    function authService($http, $q, CoreService) {
        /*
         * service object to return with the methods
         */
        return {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn
        };
        /*
         * Log-in the user
         * return a promise
         * on success save and return the userdata
         * on error clearUserdata e reject the promise
         * NOTE: on 401 code the interceptor catch it and show an error notify.
         */

        function login(credentials) {
            return $http.post('/api/login', credentials);
        }
        /*
         check if user is logged: api/islogged
         return generic promise if userData doesn't exists resolved with false
         return http promise if exist userData stored on localStorage
         */
        function isLoggedIn() {
            var defer = $q.defer();
            var userData = CoreService.getUserData();
            if(userData === false) {
                defer.resolve(false);
                return defer.promise;
            } else {
                return $http.get('/api/islogged', {ignoreLoadingBar: true, cache: false});
            }
        }
        /*
         * Perform the api/logout
         * on success/error clearUserData
         */
        function logout() {
            return $http.post('/api/logout');
        }
    }
})();