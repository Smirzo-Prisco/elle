(function() {

    'use strict';

    angular
        .module('app.config.feature')
        .controller('FeatureController', FeatureController);

    FeatureController.$inject = ['$uibModal', 'SocketService', 'SweetAlert', '$translate', '$filter', 'featureDataService', 'logger', '$state'];

    function FeatureController($uibModal, SocketService, SweetAlert, $translate, $filter, featureDataService, logger, $state) {

        var vm = this;

        vm.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        vm.features = [];
        vm.originalFeatures = [];
        vm.letterList = [];
        vm.loading = true;
        vm.searchFilter = '';
        vm.formInstance = null;
        vm.letterFilterPopover = {
            templateUrl: 'letterFilter.html',
            title: 'Scegli la lettera'
        };

        featureDataService.getFeatureList().then(function(response) {
            vm.originalFeatures = vm.features = response.data.features;
            for(var i in vm.originalFeatures) {
                for(var s in vm.alphabet) {
                    if(vm.alphabet[s].toLowerCase() === vm.originalFeatures[i].name.charAt(0).toLowerCase()) {
                        if($.inArray(vm.alphabet[s], vm.letterList) === -1) {
                            vm.letterList.push(vm.alphabet[s]);
                        }
                    }
                }
            }
            vm.letterList.sort();
            vm.loading = false;
        }).catch(function(response) {
            vm.loading = false;
        });

        //filter users on selected letter
        vm.filterLetter = function(needle) {
            vm.features = $filter('letterFilter')('features', vm.originalFeatures, needle);
        };

        vm.removeElem = function(feature) {
            SweetAlert.swal({
                title: feature.name,
                text: "Vuoi cancellare la feature?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8CC53B',
                confirmButtonText: $translate.instant('auth.YES'),
                cancelButtonText: $translate.instant('auth.NO'),
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    featureDataService.deleteFeature(feature).then(function(response) {
                        for (var idx in vm.features) {
                            if (vm.features[idx]._id === feature._id) {
                                vm.features.splice(idx, 1);
                                SocketService.emit('send:deleteFeature', feature);
                                logger.info(feature.name, response.data.message);
                                break; //Stop this loop, we found it!
                            }
                        }
                    });
                }
            });
        };

        vm.openForm = function(feature) {
            vm.formInstance = $uibModal.open({
                templateUrl : 'app/config/feature/views/partials/featureForm.html',
                controller : 'FeatureFormController',
                controllerAs: 'FeatureFormCtrl',
                resolve : {
                    parent_vm: function() {
                        return vm;
                    },
                    feature : function() {
                        return feature;
                    }
                }
            });
        };

        /*Start socket*/
        SocketService.on('newFeature', function (message) {
            logger.info(message.fullname, "New feature on board!");
            vm.features.push(message);
        });

        SocketService.on('editFeature', function (message) {
            vm.features.forEach(function(feature,index) {
                if (feature._id === message._id){
                    vm.features[index] = message;
                }
            });
        });

        SocketService.on('deleteFeature', function (message) {
            if(vm.featureFormInstance != null) {
                vm.featureFormInstance.close();
                vm.searchFilter = '';
            }
            vm.features.forEach(function(feature,index) {
                if (feature._id === message._id){
                    vm.features.splice(index, 1);
                }
            });
            logger.info('Feature deleted from another user', message.name);
        });
        /*Fine Socket socket*/


    }

})();


