(function() {
    'use strict';

    angular
        .module('utils.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toaster'];

    function logger($log, toaster) {
        var service = {
            error   : error,
            info    : info,
            success : success,
            warning : warning,
            // straight to console; bypass toastr
            log     : $log.log
        };

        return service;
        /////////////////////

        function error(message, title, data) {
            var data_obj = data || {};
            toaster.pop('error', title, message);
            $log.error('Error: ' + message, data_obj);
        }

        function info(message, title, data) {
            var data_obj = data || {};
            toaster.pop('info', title, message);
            $log.info('Info: ' + message, data_obj);
        }

        function success(message, title, data) {
            var data_obj = data || {};
            toaster.pop('success', title, message);
            $log.info('Success: ' + message, data_obj);
        }

        function warning(message, title, data) {
            var data_obj = data || {};
            toaster.pop('warning', title, message);
            $log.warn('Warning: ' + message, data_obj);
        }
    }
}());