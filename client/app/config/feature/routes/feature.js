(function() {

    'use strict';

    angular
        .module('app.config.feature')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app.config.feature', {
                url: '/feature',
                controller: function($scope, $state, CoreService) {
                    $state.current.val = CoreService.getFeaturePermissionValue($state.current.name);
                    //You are trying to go on a feature without permission on it
                    if($state.current.val === undefined || $state.current.val < 100) {
                        $state.go('error.404');
                    }
                },
                templateUrl: 'app/config/feature/views/featurelist.html',
                authenticate: true,
                data: { pageTitle: 'Sezioni' },
                ncyBreadcrumb: {
                    label: 'Features'
                }
            });
    }
})();