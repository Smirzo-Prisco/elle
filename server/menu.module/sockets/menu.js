'use strict';

module.exports = function(socket) {
    socket.on('send:newMenu', function (data) {
        //console.log('SERVER EMIT - >' + data);
        //console.log(data);
        this.broadcast.emit('newMenu', data);
    });

    socket.on('send:editMenu', function (data) {
        //console.log(data);
        this.broadcast.emit('editMenu', data);
    });

    socket.on('send:deleteMenu', function (data) {
        //console.log(data);
        this.broadcast.emit('deleteMenu', data);
    });
 };