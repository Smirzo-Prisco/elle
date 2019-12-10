'use strict';

var multer  = require('multer');
var fs = require('fs');
var configEnv = require('../../config/env/' + process.env.NODE_ENV + '.js');

var avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        var newDestination = configEnv.appdata+'avatar/';
        var stat = null;

        try {
            stat = fs.statSync(newDestination);
        } catch (err) {
            fs.mkdirSync(newDestination);
        }

        if (stat && !stat.isDirectory()) {
            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
        }

        cb(null, newDestination);
    },
    filename: function (req, file, cb) {
        //console.log(file);
        cb(null, req.user._id + '_' + new Date().getTime()+ '.png');
    }
});

var avatarUpload = multer({
    dest: configEnv.appdata + 'uploads/',
    limits: {
        fieldNameSize: 100,
        fileSize: 60000000
    },
    storage: avatarStorage
});

module.exports = avatarUpload;