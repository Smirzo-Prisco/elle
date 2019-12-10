'use strict';

module.exports = function(socket) {

    socket.on('send:newUser', function (data) {
        this.broadcast.emit('newUser', data);
    });

    socket.on('send:editUser', function (data) {
        this.broadcast.emit('editUser', data);
    });

    socket.on('send:deleteUser', function (data) {
        this.broadcast.emit('deleteUser', data);
    });

 };

