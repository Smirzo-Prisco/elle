(function() {

    'use strict';

    angular
        .module('app.profile')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('app.profile', {
                url: '/profile',
                templateUrl: 'app/profile/views/default.html',
                authenticate: true,
                data: { pageTitle: 'User profile' },
                ncyBreadcrumb: {
                    label: 'Profile'
                }
            });

    }
})();

