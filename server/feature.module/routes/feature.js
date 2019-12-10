'use strict';

var features = require('../controllers/feature.js');

module.exports = function(routes) {

    routes.route('/features')
        .post(features.create)
        .get(features.read);

    routes.route('/features/:id')
        .get(features.single)
        .put(features.update)
        .delete(features.delete);

};
