'use strict';

module.exports = {
    mongodb: 'mongodb://localhost/elle-dev',
    superSecret: 'developmentSessionSecret',
    cookie: {
        name: 'elle.dev.sid',
        expire: 3600000*8
    },
    appdata: 'client/app_data/'
};