'use strict';

var express = require('express'),
    routes = express.Router();

//Routes WITHOUT PassportJs Control
require('./../auth.module/routes/auth.js')(routes);
require('./../appData.module/routes/appData.js')(routes);

routes.use(function(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({success: false, message: 'Need authentication.'});
    }
});

//Routes WITH PassportJs Control
//Adding here other routes for MongoDB
require('./../user.module/routes/user.js')(routes);
require('./../feature.module/routes/feature.js')(routes);
require('./../menu.module/routes/menu.js')(routes);

//Main exporter for Server Routing
module.exports = routes;
