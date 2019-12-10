'use strict';

var example = require('../controllers/example.js');
var pg = require('./../../config/pg.common.js');

module.exports = function(routesPg) {

    routesPg.route('/example/:server')
        .get(pg.getServerDataConnection, example.readPgPromise);

};
