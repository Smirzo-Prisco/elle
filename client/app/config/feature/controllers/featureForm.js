(function() {

    'use strict';

    angular
        .module('app.config.user')
        .controller('FeatureFormController', FeatureFormController);

    FeatureFormController.$inject = ['parent_vm', '$uibModalInstance', 'feature', 'featureDataService', 'logger', 'SocketService'];

    function FeatureFormController(parent_vm, $uibModalInstance, feature, featureDataService, logger, SocketService) {

        var vm = this;
        /*
         * vm.formMode = 1 -> editing form
         * vm.formMode = 0 -> new feature form (default)
         */
        vm.formMode = 0; //new user form

        if(feature!=null) {
            vm.formMode = 1; // edit form
            vm.feature = angular.copy(feature);
        } else {
            vm.formMode = 0; // new user form
            vm.feature = {
                'name': '',
                'i18n': '',
                'sref': '',
                'rbac': {
                    'users': [],
                    'roles': []
                }
            }
        }

        vm.ok = function() {
            $uibModalInstance.close();
        };

        vm.cancel = function(form) {
            $uibModalInstance.dismiss('cancel');
        };

        vm.submit = function(form) {

            if(vm.formMode === 1) {
                if(form.$valid) { 
                    //EDIT FEATURE 
                    featureDataService.editFeature(vm.feature._id, vm.feature).then(function(response) { 
                        var featureUpdated = response.data.feature; 
                        for (var i in parent_vm.features) { 
                            if (parent_vm.features[i]._id === featureUpdated._id) { 
                                parent_vm.features[i] = featureUpdated; 
                                break; //Stop this loop, we found it! 
                                } 
                        } 
                        logger.success(featureUpdated.name, response.data.message); 
                        SocketService.emit('send:editFeature', featureUpdated); 
                        $uibModalInstance.close(); 
                    });  
                } else { 
                    logger.warning('Form not valid', 'Warning');
                 }
            } else {
                //ADD FEATURE
                if(form.$valid) {
                    featureDataService.insertFeature(vm.feature).then(function(response) {
                        var objectAdded = response.data.feature;
                        parent_vm.features.unshift(objectAdded);
                        logger.success(objectAdded.name, response.data.message);
                        SocketService.emit('send:newFeature', objectAdded);
                        parent_vm.searchFilter = objectAdded.name;
                        $uibModalInstance.close();
                    });
                } else {
                    logger.warning('Form not valid', 'Warning');
                }
            }

        };

    }

})();

