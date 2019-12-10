'use strict';

var passport = require('passport'),
    configEnv = require('./../../config/env/' + process.env.NODE_ENV + '.js');

exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(401).json({'err': err});
        }

        if(user) {
            var userdata = {
                id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                fullname: user.fullname,
                avatar: user.avatar,
                phone: user.phone
            };

            req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.status(200).json({'userdata': userdata});
            });

        } else {
            return res.status(401).json({'err': info.message});
        }
    })(req, res, next);
};

exports.islogged = function(req, res) {
    if(req.isAuthenticated()) {
        // var userdata = {
        //     id: req.user._id,
        //     lastname: req.user.lastname,
        //     firstname: req.user.firstname,
        //     email: req.user.email,
        //     fullname: req.user.fullname,
        //     avatar: req.user.avatar,
        //     phone: req.user.phone
        // };
        // return res.status(200).json({'user': userdata, 'message': 'You are logged.'});
        return res.status(200).json({'message': 'You are logged.'});
    } else {
        return res.status(401).json({'err': 'Not logged.'});
    }
};

exports.logout = function(req, res) {
    req.logOut(); //Logout from Passport
    req.session.destroy(); //ReEnforce Session record on Mongo
    res.clearCookie(configEnv.cookie.name, {path: '/'}); //clear cookie's client
    return res.status(200).json({'message': 'Ok Logged Out'});
};