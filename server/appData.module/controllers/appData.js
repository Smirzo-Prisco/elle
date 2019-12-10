var AppData = require('mongoose').model('AppData');

// GET list Features
exports.read = function(req, res) {
    AppData.findOne().exec(function(err, data) {
        if (err) {
            return res.status(400).json({'err': err.message});
        } else {
            return res.status(200).json({ 'appdata': data});
        }
    });
};