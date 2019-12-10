'use strict';

var users = require('../controllers/user.js');
var avatarUpload = require('../../common.module/controllers/uploader.js');

module.exports = function(routes) {

    routes.route('/users')
        .post(users.create)
        .get(users.read);

    routes.route('/users/:id')
        .get(users.single)
        .put(users.update)
        .patch(users.active)
        .delete(users.delete);

    routes.route('/avatar')
        .post(avatarUpload.single("file"), users.uploadAvatar)

    routes.route('/avatar/:id')
        .delete(users.resetAvatar);


};
