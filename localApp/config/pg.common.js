'use strict';

// var Server = require('mongoose').model('Server'); // Use this to perform accesses inside serverCollection via Mongoose
var pgp = require('pg-promise')({noWarnings: true});

exports.getServerDataConnection = function(req, res, next) {

    var serverCode = req.params.server;

    /*Server.findOne({code: serverCode})
        .select('net name code')
        .exec(function(err, serverFounded) {
            if (err) {
                return res.status(400).json({'err': err.message});
            } else {

                if (serverFounded) {
                    req.pgServerTarget = serverFounded;
                    next();
                } else {
                    return res.status(400).json({'err': 'Server not found'});
                }

            }
        });*/

};

exports.connectToDbServer = function(whatDb) {
    return pgp(whatDb);
};