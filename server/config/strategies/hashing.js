'use strict';

var crypto = require('crypto');

// GET list Users
exports.genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};


exports.sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

exports.saltHashPassword = function(userpassword){
    var salt = this.genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = this.sha512(userpassword, salt);
    return {
        salt: passwordData.salt,
        passwordHash: passwordData.passwordHash
    };
};


exports.authenticate = function(password, userPassword, userSalt) {
   return userPassword === this.sha512(password, userSalt).passwordHash;
};

