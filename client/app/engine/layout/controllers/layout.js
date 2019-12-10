(function() {

    'use strict';

    angular
        .module('app.engine.layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$rootScope', '$scope', '$state', '$window', '$document', '$aside', '$uibModal', 'cfpLoadingBar', 'Fullscreen', 'CoreService'];

    function LayoutController($rootScope, $scope, $state, $window, $document, $aside, $uibModal, cfpLoadingBar, Fullscreen, CoreService) {

        // Loading bar transition
        // -----------------------------------
        var $win = $($window), $body = $('body');
        var vm = this;

        $scope.horizontalNavbarCollapsed = true;
        $scope.menuInit = function (value) {
            $scope.horizontalNavbarCollapsed = value;
        };
        $scope.menuToggle = function (value) {
            $scope.horizontalNavbarCollapsed = !$scope.horizontalNavbarCollapsed;
        };


        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //start loading bar on stateChangeStart
            cfpLoadingBar.start();
            $scope.horizontalNavbarCollapsed = true;
            if (toState.name === 'app.pagelayouts.boxedpage') {
                $body.addClass('app-boxed-page');
            } else {
                $body.removeClass('app-boxed-page');
            }
            if(typeof CKEDITOR !== 'undefined'){
                for(var i = 0; i < CKEDITOR.instances.length; i++) {
                    CKEDITOR.instances[i].destroy();
                }
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            //stop loading bar on stateChangeSuccess
            event.targetScope.$watch('$viewContentLoaded', function () {
                cfpLoadingBar.complete();
            });

            // scroll top the page on change state
            $('#app .main-content').css({
                position: 'relative',
                top: 'auto'
            });

            $('footer').show();

            window.scrollTo(0, 0);

            if (angular.element('.email-reader').length) {
                angular.element('.email-reader').animate({
                    scrollTop: 0
                }, 0);
            }

            // Save the route title
            $rootScope.currTitle = $state.current.title;

        });

        //global function to scroll page up
        $scope.toTheTop = function () {
            $document.scrollTopAnimated(0, 600);
        };

        // Function that find the exact height and width of the viewport in a cross-browser way
        var viewport = function () {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        };
        // function that adds information in a scope of the height and width of the page
        $scope.getWindowDimensions = function () {
            return {
                'h': viewport().height,
                'w': viewport().width
            };
        };

        // Detect when window is resized and set some variables
        $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {
            $scope.windowHeight = newValue.h;
            $scope.windowWidth = newValue.w;

            if (newValue.w >= 992) {
                $scope.isLargeDevice = true;
            } else {
                $scope.isLargeDevice = false;
            }
            if (newValue.w < 992) {
                $scope.isSmallDevice = true;
            } else {
                $scope.isSmallDevice = false;
            }
            if (newValue.w <= 768) {
                $scope.isMobileDevice = true;
            } else {
                $scope.isMobileDevice = false;
            }
        }, true);
        // Apply on resize
        $win.on('resize', function () {

            $scope.$apply();
            if ($scope.isLargeDevice) {
                $('#app .main-content').css({
                    position: 'relative',
                    top: 'auto',
                    width: 'auto'
                });
                $('footer').show();
            }
        });

        vm.asideState = {
            open: false
        };

        vm.openAside = function(position, backdrop) {
            vm.asideState = {
                open: true,
                position: position
            };

            function postClose() {
                vm.asideState.open = false;
            }

            $aside.open({
                templateUrl: 'app/engine/layout/views/partials/settings-selector.html',
                placement: position,
                size: 'sm',
                backdrop: backdrop,
                controller: function($scope, $uibModalInstance) {
                    vm.ok = function(e) {
                        $uibModalInstance.close();
                        e.stopPropagation();
                    };
                    vm.cancel = function(e) {
                        $uibModalInstance.dismiss();
                        e.stopPropagation();
                    };
                }
            }).result.then(postClose, postClose);
        }

        /* OPEN ACTOR OBJECT PERMISSION */
        vm.openActorPermissionForm = function(actorType, actorObject, targetType, targetObject) {
            var permissionFormInstance = $uibModal.open({
                templateUrl : 'app/config/rbac/views/actorPermissionForm.html',
                controller : 'ActorPermissionController',
                controllerAs: 'ActorPermissionCtrl',
                resolve : {
                    parent_vm: function() {
                        return vm;
                    },
                    actorType: function() {
                        return actorType;
                    },
                    actorObject: function() {
                        return actorObject;
                    },
                    targetType: function() {
                        return targetType;
                    },
                    targetObject: function() {
                        return targetObject;
                    }
                }
            });
        };

        /* OPEN ACTOR OBJECT PERMISSION */
        vm.openObjectPermissionForm = function(targetObject, typeObject) {
            var permissionFormInstance = $uibModal.open({
                templateUrl : 'app/config/rbac/views/objectPermissionForm.html',
                controller : 'ObjectPermissionController',
                controllerAs: 'ObjectPermissionCtrl',
                resolve : {
                    parent_vm: function() {
                        return vm;
                    },
                    targetObject: function() {
                        return targetObject;
                    },
                    typeObject: function() {
                        return typeObject;
                    }
                }
            });
        };
    }
})();