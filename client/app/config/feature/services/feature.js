(function() {

    angular
        .module('app.config.feature')
        .factory('featureDataService', featureDataService);

    featureDataService.$inject = ['$http'];

    function featureDataService($http) {

        /*
         * service object to return with the methods
         */
        var service = {
            getFeatureList: getFeatureList,
            insertFeature: insertFeature,
            editFeature: editFeature,
            deleteFeature: deleteFeature
        };

        return service;



        /*
         * get method
         */
        function getFeatureList() {
            return $http.get('api/features');
        }

        /*
         * post method
         */
        function insertFeature(feature) {
            return $http.post('api/features', feature);
        }

        /*  * put method  */
         function editFeature(idFeature, feature) { 
            return $http.put('api/features/'+idFeature, feature); 
        }

        /*
         * delete method
         */
        function deleteFeature(feature) {
            return $http.delete('api/features/'+feature._id);
        }


    }

})();