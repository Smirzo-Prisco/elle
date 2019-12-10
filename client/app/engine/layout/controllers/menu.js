(function() {

    'use strict';

    angular
        .module('app.engine.layout')
        .controller('MenuController', MenuController);

    MenuController.$inject = ['$rootScope', 'CoreService'];

    function MenuController($rootScope, CoreService) {
        var vm = this;
        vm.loadingMenu = true;

        CoreService.getMenu().then(function(response) {
            vm.features = response.data.menus;
            CoreService.saveFeatures(vm.features);
            vm.loadingMenu = false;
        });
    }
})();