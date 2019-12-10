var User = require('mongoose').model('User');
var crypto = require('crypto');
var fs = require('fs');
var hash = require('../../config/strategies/hashing.js');
var configEnv = require('../../config/env/' + process.env.NODE_ENV + '.js');


// GET list Users
exports.read = function(req, res) {
    User.find({ 'deleted': false })
        .select('-password -salt')
        .populate('roles', '-users')
        .exec(function(err, users) {
            if (err) {
                return res.status(400).json({'err': err.message});
            } else {
                return res.status(200).json({'users': users});
            }
        });
};


// GET Single User (no body ATM)
exports.single = function(req, res) {

    var id = req.params.id;

    User.findOne(
        {
            $and:[
                { '_id': id},
                {'deleted': false}
            ]
        })
        .select('-password -salt')
        .populate('roles', '-users')
        .exec(function(err, user) {
            if(err) {
                return res.status(400).json({'err': err.message});
            } else
            {
                return res.status(200).json({'user': user});
            }
        });

};


// POST Create a new User
exports.create = function(req, res) {

    // newUser Model from the body
    var user = req.body;

    //Checking for model consistency
    if ((!user.firstname)||(!user.lastname)||(!user.email)||(!user.username)||(!user.password))
    {
        return res.status(400).json({'err': 'Not consistency on model'});
    }
    else if ((user.firstname.length < 2)||
        (user.lastname.length < 2)||
        (user.email.length < 6)||
        (user.username.length < 5)||
        (user.password.length < 5))
    {
        return res.status(400).json({'err': 'Not consistency on data'});
    }
    else {

        //Find if exists username or email inside User collection
        User.count({
            $or:[
                {username: user.username},
                {email: user.email}
            ]}, function (err, userFounded) {
            if(err) {
                return res.status(400).json({'err': err.message});
            } else
            {
                //Check if exists other users
                if(userFounded === 0) {

                    if((user.password)&&(user.password.length >= 5)) {

                        var pswData = hash.saltHashPassword(user.password);
                        user.salt = pswData.salt;
                        user.password = pswData.passwordHash;
                    }

                    //Saving new User
                    User.create(user, function(err, user) {
                        if(err){
                            return res.status(400).json({'err': err.message});
                        }
                        else
                        {
                            //As res sending new user purged from some fields
                            User.findOne({ _id: user._id})
                                .select('-password -salt')
                                .populate('roles', '-users')
                                .exec(function(err, user) {
                                    if(err) {
                                        return res.status(400).json({'err': err.message});
                                    } else
                                    {
                                        return res.status(200).json({'user': user, 'message': 'User created' });
                                    }
                                });
                        }

                    });
                }
                else
                {
                    //Saving not possible
                    return res.status(400).json({'user': user, 'err': 'User exists' });
                }
            }
        });

    }

};


// PUT Update a single User
exports.update = function(req, res) {

    var _userId = req.params.id;
    // newUser Model from the body
    var user = req.body;

    //Checking for model consistency with reinforcement password optional
    if ((!user.firstname)||(!user.lastname)||(!user.email)||(!user.username))
    {
        return res.status(400).json({'err': 'Not consistency on model'});
    }
    else if (
        (user.firstname.length < 2)||
        (user.lastname.length < 2)||
        (user.email.length < 6)||
        (user.username.length < 5))
    {
        return res.status(400).json({'err': 'Not consistency on data'});
    }
    else if((user.password)&&(user.password.length < 5)) {
        return res.status(400).json({'err': 'Not consistency on data'});
    }
    else {

        //1. check if exists the user i'm trying to update
        User.count(

            {
                $and:[
                    { '_id': _userId},
                    {'deleted': false}
                ]
            }, function(err, userMe) {

            if (userMe > 0) {

                //2. Find if exists username or email inside User collection (excluding me)
                User.count(
                    {
                        $and: [
                            {$or:[
                                {username: user.username},
                                {email: user.email}
                            ]},
                            {'_id': {$ne: _userId}}
                        ]
                    }, function (err, userFounded) {

                        //Check if exists other user
                        if(userFounded === 0) {
                            if (err) {
                                return res.status(400).json({'err': err.message});
                            } else {
                                if((user.password)&&(user.password.length >= 5)) {

                                    var pswData = hash.saltHashPassword(user.password);
                                    user.salt = pswData.salt;
                                    user.password = pswData.passwordHash;
                                }

                                //3. Updating User
                                User.findByIdAndUpdate(_userId, {$set: user}, function (err, userUpdated) {
                                    //Exit on Error
                                    if (err) {
                                        return res.status(400).json({'err': err.message});
                                    } else {
                                        //As res sending new user purged from some fields
                                        User.findOne({ _id: userUpdated._id})
                                            .select('-password -salt')
                                            .select()
                                            .populate('roles', '-users')
                                            .exec(function(err, userFounded) {
                                                if(err) {
                                                    return res.status(400).json({'err': err.message});
                                                } else
                                                {
                                                    return res.status(200).json(
                                                        {'user': userFounded, 'message': 'User updated' }
                                                    );
                                                }
                                            });
                                    }
                                });
                            }
                        } else {
                            //Updating not possible
                            return res.status(400).json({'user': user, 'err': 'User exists' });
                        }
                    });
            } else {
                return res.status(404).json({'err': 'Id not found'});
            }
        });
    }
};

// PUT Active/Deactive a single User
exports.active = function(req, res) {

    var _userId = req.params.id;
    // newUser Model from the body
    var user = req.body;

    //Checking for model consistency
    if(typeof(user.active) !== 'boolean')
    {
        return res.status(400).json({'err': 'Not consistency on model'});
    }

    //Checking for model consistency
    if(user.active === undefined) {
        return res.status(400).json({'err': 'Not consistency on model'});
    } else if( typeof(user.active) !== 'boolean' && user.active !== true && user.active !== false ) {
        return res.status(400).json({'err': 'Not consistency on model'});
    }
    else
    {

        if(req.user._id == _userId) {
            return res.status(404).json({'err': 'Can\'t deactive yourself'});
        }
        else {

            //1. check if exists the user i'm trying to update
            User.count({_id: _userId}, function(err, userMe) {

                if (userMe > 0) {

                    if (err) {
                        return res.status(400).json({'err': err.message});
                    }
                    else {

                        //3. Updating User only on 'active' property
                        User.findByIdAndUpdate(_userId, {$set: { 'active': user.active } },
                            function (err, userUpdated) {
                            //Exit on Error
                            if (err) {
                                return res.status(400).json({'err': err.message});
                            }
                            else {

                                //As res sending new user purged from some fields
                                User.findOne({ _id: userUpdated._id})
                                    .select('-password -salt')
                                    .select()
                                    .populate('roles', '-users')
                                    .exec(function(err, userFounded) {
                                        if(err) {
                                            return res.status(400).json({'err': err.message});
                                        } else
                                        {
                                            var msg = '';
                                            if (userFounded.active) { msg = 'User activated'; }
                                            else { msg = 'User deactivated'; }
                                            return res.status(200).json(
                                                {'user': userFounded, 'message': msg }
                                            );
                                        }
                                    });

                            }

                        });

                    }

                }
                else
                {
                    return res.status(404).json({'err': 'Id not found'});
                }

            });


        }

    }

};


// DELETE a single User and its relations with roles
exports.delete = function(req, res) {

    // todo
    // use :id validation over {ObjectId}

    var _userId = req.params.id;

    if(req.user._id == _userId) {
        return res.status(404).json({'err': 'Can\'t delete yourself'});
    }
    else {

        User.findByIdAndUpdate(_userId, { $set: { 'deleted': true, 'roles': []} }, function(err, user){
            if(err) {
                return res.status(400).json({'err': err.message});
            } else if(!user) {
                return res.status(404).json({'err': 'Id not found'});
            }
            else {

                user.roles.forEach(function(role) {

                    Role.findByIdAndUpdate(role, { $pull:{ 'users': _userId } }, function(err, role) {
                        if(err) {
                            return res.status(400).json({'err': err.message});
                        }
                    });

                });

            }

            return res.status(200).json({'message': 'User deleted'});
        });

    }



};

exports.uploadAvatar = function(req, res) {

    //CHECK IF THE USER AVATAR IS NOT THE DEFAULT IMAGE
    if(req.user.avatar !== 'no_avatar.jpg') {
        //DELETE OLD AVATAR AND UPDATE USER WITH NEW AVATAR FILNAME
        fs.unlink(configEnv.appdata+'/avatar/'+req.user.avatar, function (err) {
            if (err) {
                return res.status(500).json({'err': err.message});
            }
        });
    }

    //Updating User
    User.findByIdAndUpdate(req.user._id, {$set: { avatar: req.file.filename}}, function (err, userUpdated) {
        //Exit on Error
        if (err) {
            return res.status(400).json({'err': err.message});
        }
        else {

            //As res sending new user purged from some fields
            User.findOne({ _id: userUpdated._id})
                .select('-password -salt')
                .select()
                .populate('roles', '-users')
                .exec(function(err, userFounded) {
                    if(err) {
                        return res.status(400).json({'err': err.message});
                    } else
                    {
                        return res.status(200).json(
                            {'user': userFounded, 'message': 'User updated' }
                        );
                    }
                });

        }

    });


};

exports.resetAvatar = function(req, res) {

    var _userId = req.params.id;

    var currentAvatarName = req.user.avatar;

    //CHECK IF THE USER AVATAR IS NOT THE DEFAULT IMAGE
    if(currentAvatarName !== 'no_avatar.jpg') {
        fs.unlink(configEnv.appdata+'/avatar/'+currentAvatarName, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({'err': err.message});
            } else {
                //Updating User with default avatar
                User.findByIdAndUpdate(_userId, {$set: { avatar: 'no_avatar.jpg'}}, function (err, userUpdated) {
                    //Exit on Error
                    if (err) {
                        return res.status(400).json({'err': err.message});
                    }
                    else {

                        //As res sending new user purged from some fields
                        User.findOne({ _id: userUpdated._id})
                            .select('-password -salt')
                            .select()
                            .populate('roles', '-users')
                            .exec(function(err, userFounded) {
                                if(err) {
                                    return res.status(400).json({'err': err.message});
                                } else
                                {
                                    return res.status(200).json(
                                        {'user': userFounded, 'message': 'Avatar changed to default image' }
                                    );
                                }
                            });

                    }

                });
            }
        });
    }



};