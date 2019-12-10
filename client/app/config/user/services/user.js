(function() {

    angular
        .module('app.config.user')
        .factory('userDataService', userDataService);

    userDataService.$inject = ['$http', '$q', 'AuthService'];

    function userDataService($http, $q, AuthService) {

        /*
         * service object to return with the methods
         */
        var service = {
            getUserList: getUserList,
            insertUser: insertUser,
            deleteUser: deleteUser,
            editUser: editUser,
            setUserMode: setUserMode,
            resetAvatar: resetAvatar
        };

        return service;



        /*
         * get method
         */
        function getUserList() {
            return $http.get('api/users', {cache: false});
        }

        /*
         * post method
         */
        function insertUser(user) {
            return $http.post('api/users', user);
        }

        /*
         * delete method
         */
        function deleteUser(user) {
            return $http.delete('api/users/'+user._id);
        }

        /*
         * put method
         */
        function editUser(user) {
            return $http.put('api/users/'+user._id, user);
        }

        /*
         * active/deactive user * PATCH
         */
        function setUserMode(user, mode) {
            return $http.patch('api/users/'+user._id, {active: mode});
        }

        /*
         * reset user avatar to default image
         */
        function resetAvatar(user) {
            return $http.delete('api/avatar/'+user.id);
        }
    }

})();