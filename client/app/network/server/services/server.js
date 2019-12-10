(function() {

    angular
        .module('app.network.server')
        .factory('serverDataService', serverDataService);

    serverDataService.$inject = ['$http'];

    function serverDataService($http) {

        /*
         * service object to return with the methods
         */
        var service = {
            getServerList: getServerList,
            insertServer: insertServer,
            deleteServer: deleteServer,
            editServer: editServer,
        };

        return service;



        /*
         * get method
         */
        function getServerList() {
            return $http.get('api/servers', {cache: false});
        }

        /*
         * post method
         */
        function insertServer(server) {
            return $http.post('api/servers', server);
        }

        /*
         * delete method
         */
        function deleteServer(server) {
            return $http.delete('api/servers/'+server._id);
        }

        /*
         * put method
         */
        function editServer(server) {
            return $http.put('api/servers/'+server._id, server);
        }


    }

})();