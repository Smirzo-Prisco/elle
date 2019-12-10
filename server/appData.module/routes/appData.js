'use strict';

var appData = require('../controllers/appData.js');

module.exports = function(routes) {

    routes.route('/appdata').get(appData.read);
};