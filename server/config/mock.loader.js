'use strict';

var Mongoose = require('mongoose');
var User = Mongoose.model('User');
var Feature = Mongoose.model('Feature');
var Menu = Mongoose.model('Menu');
var AppData = Mongoose.model('AppData');
var hash = require('../config/strategies/hashing.js');

var usersMock,
    featuresMock,
    menusMock,
    appDataMock;

exports.populateStart = function() {
    if ((process.env.NODE_ENV === 'development')||(process.env.NODE_ENV === 'dev-mongolab')) {
        usersMock = require('./../user.module/mock/user_dev.js');
        featuresMock = require('./../feature.module/mock/feature_dev.js');
        menusMock = require('./../menu.module/mock/menu_dev.js');
        appDataMock = require('./../appData.module/mocks/appData_dev.js');

        //Adding here other mock-data for MongoDB dev version
    }
    else if ((process.env.NODE_ENV === 'production')||(process.env.NODE_ENV === 'prod-mongolab')) {

        usersMock = require('./../user.module/mock/user_prod.js');
        featuresMock = require('./../feature.module/mock/feature_prod.js');
        menusMock = require('./../menu.module/mock/menu_prod.js');
        appDataMock = require('./../appData.module/mocks/appData_prod.js');
        //Adding here other mock-data for MongoDB prod version

    }

    //start populating mongoDb
    populating();

};


function populating() {
    // 1. Creating users
    usersMock.forEach(function (user, index) {
        User.find({'username': user.username}, function (err, users) {
            if (!err && users.length === 0) {
                var pswData = hash.saltHashPassword(user.password);
                user.salt = pswData.salt;
                user.password = pswData.passwordHash;
                User.create(user);
            }
        });
    });

    // 2. Creating features
    featuresMock.forEach(function (feature, index) {
        Feature.find({'name': feature.name}, function (err, features) {
            if (!err && features.length === 0) {
                Feature.create(feature);
            }
        });
    });


    // 4. Creating menu
    menusMock.forEach(function (menu, index) {
        Menu.find({'item': menu.item}, function (err, menuFounded) {
             if (!err && menuFounded.length === 0) {
                Menu.create(menu);
            }
        });
    });

    // 5. Creating appData
    appDataMock.forEach(function (appData, index) {
        AppData.find({'name': appData.name}, function (err, appDataFouded) {
            if (!err && appDataFouded.length === 0) {
                AppData.create(appData);
            }
        });
    });
}