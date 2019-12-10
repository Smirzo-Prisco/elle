'use strict';

module.exports = function(socket) {

    socket.on('send:newFeature', function (data) {
        //console.log('SERVER EMIT - >' + data);
        //console.log(data);
        this.broadcast.emit('newFeature', data);
    });

    socket.on('send:editFeature', function (data) {
        //console.log(data);
        this.broadcast.emit('editFeature', data);
    });

    socket.on('send:deleteFeature', function (data) {
        //console.log(data);
        this.broadcast.emit('deleteFeature', data);
    });

 };

