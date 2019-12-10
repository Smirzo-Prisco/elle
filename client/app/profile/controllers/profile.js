(function() {

    'use strict';

    angular
        .module('app.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$rootScope', '$scope', '$uibModal', '$translate', 'SocketService', 'CoreService', 'userDataService', 'SweetAlert', 'logger'];

    function ProfileController($rootScope, $scope, $uibModal, $translate, SocketService, CoreService, userDataService, SweetAlert, logger) {

        var vm = this;
        vm.userInfo = {};

        vm.noImage = true;
        vm.editActive = false;

        CoreService.retrieveUserData($rootScope.app.currentUser.id).then(function(response) {
            vm.userInfo = response.data.user;
        });

        vm.openAvatarModal = function() {
            var modalInstance = $uibModal.open({
                animation : false,
                backdrop : 'static',
                templateUrl : 'app/profile/views/partials/uploadAvatarModal.html',
                controller : 'AvatarController',
                controllerAs : 'AvatarCtrl',
                size : 'lg'

            });
        }

        vm.updateUser = function(profileForm) {
            if(profileForm.$valid) {
                profileForm.$setPristine();
                profileForm.$setUntouched();
                profileForm.$cancel();
                //UPDATE THE USER
                userDataService.editUser(vm.userInfo).then(function(response) {
                    var objectUpdated = response.data.user;
                    CoreService.saveUserData(objectUpdated);
                    logger.success(response.data.message, objectUpdated.fullname);
                    SocketService.emit('send:editUser', objectUpdated);
                });
            } else {
                logger.warning('Form not valid', 'Warning');
            }
        }

        vm.resetAvatar = function() {
            SweetAlert.swal({
                title: 'Reset avatar',
                text: 'You are about to reset your avatar. Are you sure?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8CC53B',
                confirmButtonText: $translate.instant('auth.YES'),
                cancelButtonText: $translate.instant('auth.NO'),
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    console.log($rootScope.app.currentUser);
                    userDataService.resetAvatar($rootScope.app.currentUser).then(function(response) {
                        var objectUpdated = response.data.user;
                        CoreService.saveUserData(objectUpdated);
                        logger.success(response.data.message, objectUpdated.fullname);
                        SocketService.emit('send:editUser', objectUpdated);
                    });
                }
            });
        }

    }

})();


