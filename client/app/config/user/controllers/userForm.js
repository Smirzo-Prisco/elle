(function() {

    'use strict';

    angular
        .module('app.config.user')
        .controller('UserFormController', UserFormController);

    UserFormController.$inject = ['$rootScope', 'SocketService', 'parent_vm', '$uibModalInstance', 'user', 'CoreService', 'userDataService', 'logger'];

    function UserFormController($rootScope, SocketService, parent_vm, $uibModalInstance, user, CoreService, userDataService, logger) {

        var vm = this;

        /*
         * vm.formMode = 1 -> editing form
         * vm.formMode = 0 -> new user form (default)
         */
        vm.formMode = 0; //new user form

        if(user!=null) {
            vm.formMode = 1; // edit form
            vm.user = angular.copy(user);
        } else {
            vm.formMode = 0; // new user form
            vm.user = {
                'firstname': '',
                'lastname': '',
                'username': '',
                'password': '',
                'email': '',
                'phone': ''
            }
        }

        vm.ok = function() {
            $uibModalInstance.close();
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.submit = function(form) {

            console.log(vm.user);
            if(vm.formMode === 1) {
                //EDITING USERS
                if(form.$valid) {
                    userDataService.editUser(vm.user).then(function(response) {
                       var objectUpdated = response.data.user;
                        for (var i in parent_vm.users) {
                            if (parent_vm.users[i]._id === objectUpdated._id) {
                                parent_vm.users[i] = objectUpdated;
                                break; //Stop this loop, we found it!
                            }
                        }
                        if(objectUpdated.id === $rootScope.app.currentUser.id) {
                            CoreService.saveUserData(objectUpdated);
                        }
                        logger.success(response.data.message, objectUpdated.fullname);
                        SocketService.emit('send:editUser', objectUpdated);
                        $uibModalInstance.close();
                    });

                } else {
                    logger.warning('Form not valid', 'Warning');
                }
            } else {
                //ADD USERS
                if(form.$valid) {
                    userDataService.insertUser(vm.user).then(function(response) {
                        var objectAdded = response.data.user;
                        parent_vm.users.unshift(objectAdded);
                        SocketService.emit('send:newUser', objectAdded);
                        logger.success(response.data.message, objectAdded.fullname);
                        parent_vm.searchFilter = objectAdded.lastname;
                        $uibModalInstance.close();
                    });
                } else {
                    logger.warning('Form not valid', 'Warning');
                }
            }
        };

    }

})();

