(function() {

    'use strict';

    angular
        .module('app.dashboard')
        .controller('AcquisitionController', AcquisitionController);

    AcquisitionController.$inject = [];

    function AcquisitionController() {

        var vm = this;

        vm.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        vm.series = ['dataset'];
        vm.data = [[65, 59, 80, 81, 56, 55, 40]];
        vm.colors = [{
            fillColor: 'rgba(148,116,153,0.7)',
            strokeColor: 'rgba(148,116,153,0)',
            highlightFill: 'rgba(148,116,153,1)',
            highlightStroke: 'rgba(148,116,153,1)'
        }];
        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        vm.options = {
            maintainAspectRatio: false,
            showScale: false,
            barDatasetSpacing: 0,
            tooltipFontSize: 11,
            tooltipFontFamily: '\'Helvetica\', \'Arial\', sans-serif',
            responsive: true,
            scaleBeginAtZero: true,
            scaleShowGridLines: false,
            scaleLineColor: 'transparent',
            barShowStroke: false,
            barValueSpacing: 5
        };
    }

})();


