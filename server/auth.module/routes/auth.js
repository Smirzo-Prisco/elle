'use strict';

var auth = require('../controllers/auth.js');

module.exports = function(routes) {

    // Route to log in
    routes.route('/login').post(auth.login);
    routes.route('/logout').post(auth.logout);
    routes.route('/islogged').get(auth.islogged);
};