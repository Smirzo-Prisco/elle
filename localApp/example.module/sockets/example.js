'use strict';

module.exports = function(socket) {

    socket.on('send:msg1', function (data) {
        this.broadcast.emit('msg1', data);
    });

    socket.on('send:msg2', function (data) {
        this.broadcast.emit('msg2', data);
    });

    socket.on('send:msg3', function (data) {
        this.broadcast.emit('msg3', data);
    });

 };

