(function() {

    'use strict';

    angular
        .module('app.config.user')
        .controller('UserController', UserController);

    UserController.$inject = ['$uibModal', 'SocketService', 'SweetAlert', '$translate', '$filter', 'userDataService', 'logger'];

    function UserController($uibModal, SocketService, SweetAlert, $translate, $filter, userDataService, logger) {

        var vm = this;

        vm.alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        vm.letterList = [];
        vm.users = [];
        vm.originalUsers = [];
        vm.searchFilter = '';
        vm.formInstance = null;
        vm.loading = true;
        vm.letterFilterPopover = {
            templateUrl: 'letterFilter.html',
            title: 'Scegli la lettera'
        };

        //Retrieve users list from db and populate letterList with founded user first letter
        userDataService.getUserList().then(function(response){
            vm.originalUsers = vm.users = response.data.users;
            for(var i in vm.originalUsers) {
                for(var s in vm.alphabet) {
                    if(vm.alphabet[s].toLowerCase() === vm.originalUsers[i].lastname.charAt(0).toLowerCase()) {
                        if($.inArray(vm.alphabet[s], vm.letterList) === -1) {
                            vm.letterList.push(vm.alphabet[s]);
                        }
                    }
                }
            }
            vm.letterList.sort();
            vm.loading = false;
        });

        //filter users on selected letter
        vm.filterLetter = function(needle) {
            vm.users = $filter('letterFilter')('users', vm.originalUsers, needle);
        };

        //Delete user from db - confirm required to perform this action
        vm.removeElem = function(user) {
            SweetAlert.swal({
                title: user.fullname,
                text: "Do you want to delete the user?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8CC53B',
                confirmButtonText: $translate.instant('auth.YES'),
                cancelButtonText: $translate.instant('auth.NO'),
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    userDataService.deleteUser(user).then(function(response) {
                        for (var idx in vm.users) {
                            if (vm.users[idx]._id === user._id) {
                                vm.users.splice(idx, 1);
                                logger.info(user.fullname, response.data.message);
                                break; //Stop this loop, we found it!
                            }
                        }
                    });
                }
            });
        };

        //Enable/disable user after confirm
        vm.setUserMode = function(user, mode) {
            var text = "";
            if(!mode) {
                text = "Do you want to disable "+ user.fullname + "?";
            } else {
                text = "Do you want to enable "+ user.fullname + "?";
            }
            SweetAlert.swal({
                title: user.fullname,
                text: text,
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8CC53B',
                confirmButtonText: $translate.instant('auth.YES'),
                cancelButtonText: $translate.instant('auth.NO'),
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    userDataService.setUserMode(user, mode).then(function(response) {
                        var userUpdated = response.data.user;
                        for (var idx in vm.users) {
                            if (vm.users[idx]._id === userUpdated._id) {
                                vm.users[idx].active = userUpdated.active;
                                logger.info(user.fullname, response.data.message);
                                break; //Stop this loop, we found it!
                            }
                        }
                    });
                }
            });
        };

        //Open form to edit/create an user
        vm.openForm = function(user) {
            vm.userFormInstance = $uibModal.open({
                templateUrl : 'app/config/user/views/partials/userForm.html',
                controller : 'UserFormController',
                controllerAs: 'UserFormCtrl',
                resolve : {
                    parent_vm: function() {
                        return vm;
                    },
                    user : function() {
                        return user;
                    }
                }
            });
        };

        //Open form to manage user/role association
        vm.openJoinUserRoleForm = function(user) {
            var jointFormInstance = $uibModal.open({
                templateUrl : 'app/config/joinUserRole/views/joinUserRoleForm.html',
                controller : 'JoinUserRoleController',
                controllerAs: 'JoinUserRoleCtrl',
                resolve : {
                    parent_vm: function() {
                        return vm;
                    },
                    origin: function() {
                        return 'user';
                    },
                    originObject: function() {
                        return user;
                    }
                }
            });
        };

        //Check if the user is in special role
        vm.inSpecialRole = function(roles) {
            for(var i in roles) {
                if(roles[i].special === true) {
                    return true;
                } else {
                    return false;
                }
            }
        };

        /*Start socket*/
        SocketService.on('newUser', function (message) {
            logger.info(message.fullname, "New user on board!");
            vm.users.push(message);
        });

        SocketService.on('editUser', function (message) {
            vm.users.forEach(function(user,index) {
                if (user._id === message._id){
                    vm.users[index] = message;
                }
            });
        });

        SocketService.on('deleteUser', function (message) {
            vm.users.forEach(function(user,index) {
                if (user._id === message._id){
                    vm.users.splice(index, 1);
                }
            });
        });
        /*Fine Socket socket*/


    }

})();

