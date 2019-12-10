(function() {

    'use strict';

    angular
        .module('app.network.server')
        .controller('ServerFormController', ServerFormController);

    ServerFormController.$inject = ['$rootScope', 'SocketService', 'parent_vm', '$uibModalInstance', 'server', 'AuthService', 'serverDataService', 'logger'];

    function ServerFormController($rootScope, SocketService, parent_vm, $uibModalInstance, server, AuthService, serverDataService, logger) {

        var vm = this;

        /*
         * vm.formMode = 1 -> editing form
         * vm.formMode = 0 -> new server form (default)
         */
        vm.formMode = 0; //new server form

        if(server!=null) {
            vm.formMode = 1; // edit form
            vm.server = angular.copy(server);
        } else {
            vm.formMode = 0; // new server form
            vm.server = {
                'code': '',
                'name': ''
            };
        }

        vm.ok = function() {
            $uibModalInstance.close();
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.submit = function(form) {

            if(vm.formMode === 1) {
                //EDITING SERVER
                if(form.$valid) {
                    serverDataService.editServer(vm.server).then(function(response) {
                       var objectUpdated = response.data.server;
                        for (var i in parent_vm.servers) {
                            if (parent_vm.servers[i]._id === objectUpdated._id) {
                                parent_vm.servers[i] = objectUpdated;
                                break; //Stop this loop, we found it!
                            }
                        }
                        logger.success(response.data.message, objectUpdated.name);
                        // SocketService.emit('send:editServer', serverUpdated);
                        $uibModalInstance.close();
                    });

                } else {
                    logger.warning('Form not valid', 'Warning');
                }
            } else {
                //ADD SERVER
                if(form.$valid) {
                    serverDataService.insertServer(vm.server).then(function(response) {
                        var objectAdded = response.data.server;
                        parent_vm.servers.unshift(objectAdded);
                        // SocketService.emit('send:newUser', objectAdded);
                        logger.success(response.data.message, objectAdded.name);
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

