'use strict';

var port = process.env.PORT || 7200;

// Declaring and executing connectors via ORM
var mongoose = require('./config/mongoose.js');

// Declaring Express Middleware Configuration
var express = require('./config/express.js');
var passport = require('./config/passport.js');

// StartUp server and passportJs support
var mongodb = mongoose();
var passport = passport();
var app = express();

// Routing
var routes = require('./config/router.loader.js');
app.use('/api', routes);
var routesPg = require('./../localApp/config/router.loader.js');
app.use('/api/pg', routesPg);

var mockingData = require('./config/mock.loader.js');
mockingData.populateStart();

var io = require('socket.io')(app.listen(process.env.PORT, function() {
        console.log('***********************************************');
        console.log('Express server listening on port ' + process.env.PORT);
        console.log('***********************************************');
    })
);

var ioEvents = require('./config/socket.loader.js');
var ioEventsPg = require('./../localApp/config/socket.loader.js');

io.on('connection', function (socket) {
    ioEvents(socket);
    ioEventsPg(socket);
});

module.exports = app;