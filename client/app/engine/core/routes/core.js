(function() {

    'use strict';

    angular
        .module('app.engine.core')
        .config(config)
        .run(stateRun);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider'];

    function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        // empty url and url with /
        $urlRouterProvider.when('', '/app/dashboard');
        $urlRouterProvider.when('/', '/app/dashboard');

        // For any unmatched url, redirect to /error/page_not_found 404 not found
        $urlRouterProvider.otherwise('/error/page_not_found');

        // $ocLazyLoadProvider.config({
        //     // Set to true if you want to see what and when is dynamically loaded
        //     debug: false,
        //     events: true
        // });

        /* Basic states and abstract states for the modules
         *
         * *** LOGIN STATE NOTES ***
         * Added some custom params for this state:
         * - isError (bool): you can define if login state derive from an error auth
         * - fromLogout (bool): you can define if login state derive from logout action
         * - message (string|null): the message shown inside toaster
         */
        $stateProvider
            //CORE AUTH STATES
            .state('auth', {
                abstract: true,
                url: '/auth',
                templateUrl: 'app/engine/layout/views/base.html'
            })
            .state('auth.login', {
                url: '/login',
                authenticate: false,
                templateUrl: 'app/engine/layout/views/login.html',
                params: {
                    isError: false,
                    fromLogout: false,
                    message: null
                },
                data: {
                    pageTitle: 'Login'
                }
            })
            // ERROR STATES
            .state('error', {
                abstract: true,
                url: '/error',
                templateUrl: 'app/engine/layout/views/base.html'
            })
            .state('error.404', {
                url: '/page_not_found',
                authenticate: false,
                templateUrl: 'app/engine/layout/views/404.html',
                data: {
                    pageTitle: 'Ops... Page not found'
                }
            })
            .state('error.500', {
                url: '/server_error',
                authenticate: false,
                templateUrl: 'app/engine/layout/views/500.html',
                data: {
                    pageTitle: 'Ops... Something\'s wrong!'
                }
            })
            // MODULE SPECIFIC ABSTRACT STATES
            .state('app', {
                abstract: true,
                url: '/app',
                controller: 'CoreController as CoreCtrl',
                templateUrl: 'app/engine/layout/views/app.html',
                ncyBreadcrumb: {
                    skip : true
                }
            })
            .state('app.config', {
                url: '/config',
                abstract: true,
                template: '<div ui-view class="fade-in-down-big"></div>',
                ncyBreadcrumb: {
                    label: 'Config'
                }
            })
            .state('app.energy', {
                url: '/energy',
                abstract: true,
                template: '<div ui-view class="fade-in-down-big"></div>',
                ncyBreadcrumb: {
                    label: 'Energy'
                }
            })
            .state('app.network', {
                url: '/network',
                abstract: true,
                template: '<div ui-view class="fade-in-down-big"></div>',
                ncyBreadcrumb: {
                    label: 'Network'
                }
            })
            .state('app.asset', {
                url: '/asset',
                abstract: true,
                template: '<div ui-view class="fade-in-down-big"></div>',
                ncyBreadcrumb: {
                    label: 'Asset'
                }
            });

    }

    stateRun.$inject = ['$rootScope', '$state', 'AuthService', 'logger'];

    function stateRun($rootScope, $state, AuthService, logger) {
        $rootScope.$state = $state;

        // check the state: if the user isn't authenticated go to auth.login ui-route state
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if(toState.authenticate) {
                AuthService.isLoggedIn().then(function(response){
                    if(response===false) {
                        $state.go('auth.login', {}, {reload:true});
                    }
                }, function(response) {
                    if(response===false) {
                        $state.go('auth.login', {}, {reload:true});
                    }
                }); //the state needs authentication... check if isLoggedIn
            }
            if(toState.name === 'auth.login') {
                if(toParams.isError !== true && fromState.name !== '' && toParams.fromLogout === false) {
                    AuthService.isLoggedIn().then(function(response) {
                        if(response) {
                            $state.go('app.dashboard');
                        }
                    });
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            //If target state is auth.login and origin is logout action
            if(toState.name === 'auth.login' && toParams.fromLogout && !toParams.isError) {
                logger.info(toParams.message);
            }
        });

        //on state error go to error.500
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
            $state.go('error.500');
        });
    }

})();

