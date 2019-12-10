'use strict';

module.exports = function(socket) {

    require('./../user.module/sockets/user.js')(socket);
    require('./../role.module/sockets/role.js')(socket);
    require('./../feature.module/sockets/feature.js')(socket);
    require('./../server.module/sockets/server.js')(socket);
    //Add other sockets methods

};
