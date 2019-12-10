(function() {

    'use strict';

    var app = angular.module('app', [
        //ENGINE SECTION
        'app.engine.core',
        'app.engine.layout',
        //LOGGER MODULE
        'utils.logger',
        //PROFILE MODULE
        'app.profile',
        //DASHBOARD MODULE
        'app.dashboard',
        //CONFIG SECTION
        'app.config.user',
        'app.config.role',
        'app.config.join-user-role',
        'app.config.rbac',
        'app.config.feature',
        //NETWORK SECTION
        'app.network.net-monitoring',
        'app.network.server'
    ]);
})();