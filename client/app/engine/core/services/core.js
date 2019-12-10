(function() {

    angular
        .module('app.engine.core')
        .service('CoreService', CoreService);

    CoreService.$inject = ['$rootScope', '$http', '$localStorage', '$window'];

    function CoreService($rootScope, $http, $localStorage, $window) {

        var storage = $localStorage;

        /*
         * service object to return with the methods
         */
        var service = {
            getApplicationData: getApplicationData,
            getUserData: getUserData,
            retrieveUserData: retrieveUserData,
            saveUserData: saveUserData,
            clearUserData: clearUserData,
            saveFeatures: saveFeatures,
            getFeaturePermissionValue: getFeaturePermissionValue,
            getMenu: getMenu
        };

        return service;

        /*
          Get application data
         */
        function getApplicationData() {
            return $http.get('/api/appdata', {ignoreLoadingBar: true, cache: false});
        }

        /*
         * Retrieve userdata from the local storage
         */
        function getUserData() {
            var currentUser = storage.currentUser;
            if(currentUser === undefined) {
                return false;
            } else {
                return JSON.parse($window.atob(storage.currentUser));
            }
        }

        /*
         * Retrieve userData from remote db
         */
        function retrieveUserData(userId) {
            return $http.get('api/users/'+userId);
        }

        /*
         * Save the userdata on the local storage (encoded)
         */
        function saveUserData(user) {
            $rootScope.app.currentUser = user;
            storage.currentUser = $window.btoa(JSON.stringify($rootScope.app.currentUser));
        }

        /*
         * clear the local storage from the userdata
         */
        function clearUserData() {
            //reset currentUser
            $rootScope.app.currentUser = {
                avatar: "no_avatar.jpg",
                email: '',
                firstname:'',
                fullname:'',
                id: '',
                lastname:'',
                phone:''
            };
            delete storage.currentUser;
            delete storage.features;
        }

        //Store features retrieved from getMenu (encoded and flat formatted)
        function saveFeatures(menus) {
            var temp = [];
            menus.forEach(function(feature) {
                temp.push({'sref': feature.item.sref, 'val': feature.value});
                if(feature.children && feature.children.length > 0) {
                    feature.children.forEach(function(child) {
                        temp.push({'sref': child.item.sref, 'val': child.value});
                    });
                }
            });
            storage.features = $window.btoa(JSON.stringify(temp));
        }

        //Get Feature VAL permission for current user (sref is parameter user)
        function getFeaturePermissionValue(sref) {
            var features = [];
            if(storage.features !== undefined) {
                features = JSON.parse($window.atob(storage.features));
            }
            for(var idx in features) {
                if(features[idx].sref == sref) {
                    return features[idx].val;
                }
            }
            return 0;
        }

        /*
         * get method
         */
        function getMenu() {
            return $http.get('api/menus');
        }
    }
})();