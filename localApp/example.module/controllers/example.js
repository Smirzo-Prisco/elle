'use strict';

var pg = require('./../../config/pg.common.js');

// GET list of something via pg-promise :)
exports.readPgPromise = function(req, res, next) {

    //1) Obtain unique info about server to connect
    var serverData = req.pgServerTarget;
    var dbConnection = pg.connectToDbServer (serverData.net.mxADV);

    //Choose the query
    //1
    //var query = "select * from mxfn_sel_archive ('{\"tags\":[{\"tag\":\"13FI001_H\"}, {\"tag\":\"13TI001_H\"}] }'::json, '2016100304', '2016100305')";
    //2
    //var query = "select * from public.mxfn_sel_asset_recursive (null,null,null,null)";
    var query = "select * from public.mxfn_sel_assettree()";
    //var query = "select * from public.mxfn_sel_carriertree()";

    dbConnection.any(query, [true])
        .then(function (data) {
            return res.status(200).json({ 'data': data[0].json_ret.asset});
            //return res.status(200).json({ 'data': data[0].json_ret.carrier});
        })
        .catch(function (error) {
            console.log(error);
            return res.status(400).json({ 'err': error});
        });

};