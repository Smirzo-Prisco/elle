'use strict';

module.exports = {
    mongodb: 'mongodb://localhost/elle-prod',
    superSecret: 'productionSessionSecret',
    cookie: {
        name: 'elle.prod.sid',
        expire: 3600000*8
    },
    appdata: 'client/app_data/'
};