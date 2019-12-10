'use strict';

var express = require('express'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    favicon = require('serve-favicon'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    passport = require('passport'),
    configEnv = require('./env/' + process.env.NODE_ENV + '.js'),
    mongoose = require('mongoose');

module.exports = function() {

    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        app.use('/', express.static('./client/'));
        app.use('/', express.static('./'));
        //simulate delay of response
        //app.use(function(req,res,next){setTimeout(next,2000)})
    }
    else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
        app.use('/', express.static('./build/'));
    }
    else if (process.env.NODE_ENV === 'dev-mongolab') {
        app.use(morgan('dev'));
        app.use('/', express.static('./client/'));
        app.use('/', express.static('./'));
    }
    else if (process.env.NODE_ENV === 'prod-mongolab') {
        app.use(compress());
        app.use('/', express.static('./build/'));
    }

    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cors()); // Enable ALL CORS requests
    app.use(cookieParser());
    app.use(favicon(__dirname + './../../client/favicon.png'));

    app.use(session({
        saveUninitialized: false,
        resave: true,
        rolling: true,
        name: configEnv.cookie.name,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        secret: configEnv.superSecret,
        cookie: {
            expires: new Date(Date.now() + configEnv.cookie.expire)
        }
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    return app;

};