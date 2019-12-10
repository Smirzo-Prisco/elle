(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .controller('ExpensesController', ExpensesController);

    ExpensesController.$inject = [];

    function ExpensesController() {

        var vm = this;

        vm.cpuValue = 65;
        vm.cpuOptions = {
            unit: '%',
            readOnly: true,
            size: 70,
            fontSize: '11px',
            textColor: '#fff',
            trackWidth: 5,
            barWidth: 10,
            trackColor: 'rgba(255,255,255,0.4)',
            barColor: '#8773A8'
        };

        vm.ramValue = 330;
        vm.ramOptions = {
            unit : 'MB',
            readOnly : true,
            size : 70,
            fontSize : '11px',
            textColor : '#fff',
            trackWidth : 5,
            barWidth : 10,
            trackColor : 'rgba(255,255,255,0.4)',
            barColor : '#8773A8',
            max : 1024
        };
    }

})();


