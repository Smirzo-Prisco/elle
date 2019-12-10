(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .controller('PerformanceController', PerformanceController);

    PerformanceController.$inject = [];

    function PerformanceController() {

        var vm = this;

        vm.value = 85;
        vm.options = {
            size : 125,
            unit: '%',
            trackWidth : 10,
            barWidth : 10,
            step : 5,
            trackColor : 'rgba(52,152,219,.1)',
            barColor : 'rgba(69,204,206,.5)'
        };
    }

})();


