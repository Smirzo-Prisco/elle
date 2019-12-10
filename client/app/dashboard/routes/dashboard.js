(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                controller: function($scope, $state, CoreService) {
                    $state.current.val = CoreService.getFeaturePermissionValue($state.current.name);
                    //You are trying to go on a feature without permission on it
                    if($state.current.val === undefined || $state.current.val < 100) {
                        $state.go('error.404');
                    }
                },
                templateUrl: 'app/dashboard/views/dashboard_default.html',
                authenticate: true,
                params: {
                    value: 0
                },
                data: { pageTitle: 'Dashboard' },
                ncyBreadcrumb: {
                    label: 'Dashboard'
                }
            });

    }
})();

