(function() {

    'use strict';

    angular
        .module('app.config.user')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.config.user', {
                url: '/user',
                controller: function($scope, $state, CoreService) {
                    $state.current.val = CoreService.getFeaturePermissionValue($state.current.name);
                    //You are trying to go on a feature without permission on it
                    if($state.current.val === undefined || $state.current.val < 100) {
                        $state.go('error.404');
                    }
                },
                templateUrl: 'app/config/user/views/userList.html',
                authenticate: true,
                data: { pageTitle: 'Utenti'},
                ncyBreadcrumb: {
                    label: 'Utenti'
                }
            });
    }
})();