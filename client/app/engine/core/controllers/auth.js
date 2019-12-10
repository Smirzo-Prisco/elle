(function() {

    'use strict';

    angular
        .module('app.engine.core')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$state', '$translate', 'AuthService', 'CoreService', 'SweetAlert'];

    function AuthController($state, $translate, AuthService, CoreService, SweetAlert) {
        var vm = this;

        vm.loginData = {
            'username': '',
            'password': ''
        };

        /*
         * login method
         */
        vm.submitLogin = function() {
            AuthService.login(vm.loginData).then(function(loginResponse) {
                // DOWNLOAD FEATURES AND SAVE
                CoreService.getMenu().then(function(getMenuResponse) {
                    //Verify that the user has permissions on at least one function
                    if(getMenuResponse.data.menus.length > 0) {
                        CoreService.saveFeatures(getMenuResponse.data.menus);
                        //SAVE USERDATA IN LOCALSTORAGE
                        CoreService.saveUserData(loginResponse.data.userdata);
                        $state.go('app.dashboard');
                    } else {
                        AuthService.logout().then(function() {
                            $state.go('auth.login', {
                                isError: false, fromLogout: true, message: "Non hai il permesso di accedere!"
                            },{
                                reload: true, inherit: false, notify: true
                            });
                        });
                    }
                });
            });
        };

        /*
         * logout method
         * Open a popup to confirm
         */
        vm.logout = function() {
            SweetAlert.swal({
                title: $translate.instant('auth.LOGOUT'),
                text: $translate.instant('auth.CONFIRM_LOGOUT'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#8CC53B',
                confirmButtonText: $translate.instant('auth.YES'),
                cancelButtonText: $translate.instant('auth.NO'),
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    AuthService.logout().then(function() {
                        $state.go('auth.login', {isError: false, fromLogout: true, message: "Ciao ciao"}, { reload: true, inherit: false, notify: true });
                        CoreService.clearUserData();
                    });
                }
            });
        };
    }
})();