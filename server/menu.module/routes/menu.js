'use strict';

var menus = require('../controllers/menu.js');

module.exports = function(routes) {
     routes.route('/menus').get(menus.read);
};