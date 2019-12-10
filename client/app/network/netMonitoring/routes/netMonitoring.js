(function() {

    'use strict';

    angular
        .module('app.network.net-monitoring')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.network.net-monitoring', {
                url: '/monitoring',
                controller: function($scope, $state, CoreService) {
                    $state.current.val = CoreService.getFeaturePermissionValue($state.current.name);
                    //You are trying to go on a feature without permission on it
                    if($state.current.val === undefined || $state.current.val < 100) {
                        $state.go('error.404');
                    }
                },
                templateUrl: 'app/network/netMonitoring/views/default.html',
                authenticate: true,
                params: {
                    value: 0
                },
                data: { pageTitle: 'Network > Monitoring' },
                ncyBreadcrumb: {
                    label: 'Monitoring'
                }
            });

    }
})();

