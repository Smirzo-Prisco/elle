var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User'),
    hash = require('../../config/strategies/hashing.js');

module.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done) {
        User.findOne({
            username: username,
            deleted: false
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            if (!hash.authenticate(password, user.password, user.salt)) {
                return done(null, false, {
                    message: 'Invalid password'
                }); }

            if (user.active === false) {
                return done(null, false, {
                    message: 'User not activated'
                });
            }

            return done(null, user);

        });
    }));
};
