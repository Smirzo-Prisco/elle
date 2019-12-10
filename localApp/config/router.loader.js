'use strict';

var express = require('express'),
    routesPg = express.Router();


routesPg.use(function(req, res, next) {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json({success: false, message: 'Need authentication.'});
    }
});

//Routes WITH PassportJs Control
//Adding here other routes for PgSql
require('./../example.module/routes/example.js')(routesPg);

//Main exporter for Server Routing
module.exports = routesPg;

