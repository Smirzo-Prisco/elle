'use strict';

var mongoose = require('mongoose'),
    configEnv = require('./env/' + process.env.NODE_ENV + '.js');

mongoose.Promise = global.Promise;

console.log(configEnv.mongodb);

module.exports = function() {
    var mongodb = mongoose.connect(configEnv.mongodb, function(err) {
        if(err) {
            console.log('Failed connecting to MongoDb');
        } else {
            console.log('Successfully connected to MongoDb');
        }
        console.log('***********************************************');
    });

    require('../user.module/models/user.js');
    require('../feature.module/models/feature.js');
    require('../menu.module/models/menu.js');
    require('../appData.module/models/appData.js');

    return mongodb;
};