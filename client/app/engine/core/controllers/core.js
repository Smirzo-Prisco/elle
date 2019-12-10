(function() {

    'use strict';

    angular
        .module('app.engine.core')
        .controller('CoreController', CoreController);

    CoreController.$inject = [];

    function CoreController() {
        var vm = this;
    }
})();