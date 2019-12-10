var Feature = require('mongoose').model('Feature');

// GET list Features
exports.read = function(req, res) {
    Feature.find({})
        .select('-rbac')
        .exec(function(err, features) {
            if (err) {
                return res.status(400).json({'err': err.message});
            } else {
                return res.status(200).json({ 'features': features});
            }
        });

};

// GET Single Feature (no body ATM)
exports.single = function(req, res) {

    var id = req.params.id;
    Feature.findOne({ _id: id})
        .select('-rbac')
        .exec(function(err, feature) {
            if (err) {
                return res.status(400).json({'err': err.message});
            } else {
                //rbac.getMaxPerms(req, res, req.user, feature, 'feature');
                return res.status(200).json({'feature': feature});
            }
        });

};

// POST Create a new Feature
exports.create = function(req, res) {

    // newFeature Model from the body
    var feature = req.body;

    //Checking for model consistency
    if ((!feature.name)||(!feature.i18n)||(!feature.sref)) {
        return res.status(400).json({'err': 'Not consistency on model'});
    } else if ((feature.name.length < 3)||(feature.i18n.length < 3)||(feature.sref.length < 3)) {
        return res.status(400).json({'err': 'Not consistency on data'});
    } else {
        //Find if exists name or i18n or sref inside Feature collection
        Feature.count({
            $or:[
                {name: feature.name},
                {i18n: feature.i18n},
                {sref: feature.sref}
            ]}, function (err, featureFounded) {
            if(err) {
                return res.status(400).json({'err': err.message});
            } else
            {
                //Check if exists other feature
                if(featureFounded === 0) {

                    //Saving new Feature
                    Feature.create(feature, function(err, feature) {
                        if(err){
                            return res.status(400).json({'err': err.message});
                        }
                        else
                        {
                            //As res sending new feature purged from some fields
                            Feature.findOne({ _id: feature._id})
                                .select('-rbac')
                                .exec(function(err, feature) {
                                    if(err) {
                                        return res.status(400).json({'err': err.message});
                                    } else
                                    {
                                        return res.status(200).json({'feature': feature, 'message': 'Feature created' });
                                    }
                                });
                        }

                    });
                }
                else
                {
                    //Saving not possible
                    return res.status(400).json({'feature': feature, 'err': 'Feature exists' });
                }
            }
        });
    }
};

// PUT Update a single Feature
exports.update = function(req, res) {
    var _featureId = req.params.id;
    // newFeature Model from the body
    var feature = req.body;

    //Checking for model consistency
    if ((!feature.name)||(!feature.i18n)||(!feature.sref)) {
        return res.status(400).json({'err': 'Not consistency on model'});
    } else if ((feature.name.length < 3)||(feature.i18n.length < 3)||(feature.sref.length < 3)) {
        return res.status(400).json({'err': 'Not consistency on data'});
    } else {
        //1. check if exists the feature i'm trying to update
        Feature.count({_id: _featureId}, function(err, featureMe) {
            if (featureMe > 0) {
                //2. Find if exists name or i18n or sref inside Feature collection (excluding me)
                Feature.count(
                    {
                        $and: [
                            {
                                $or: [
                                    {name: feature.name},
                                    {i18n: feature.i18n},
                                    {sref: feature.sref}
                                ]
                            },
                            {
                                '_id': {$ne: _featureId}
                            }
                        ]
                    }, function (err, featureFounded) {
                        //Check if exists other feature
                        if(featureFounded === 0) {
                            if (err) {
                                return res.status(400).json({'err': err.message});
                            } else {

                                //3. Updating Feature

                                Feature.findByIdAndUpdate(_featureId, {$set: feature}, function (err, featureUpdated) {
                                    //Exit on Error
                                    if (err) {
                                        return res.status(400).json({'err': err.message});
                                    }
                                    else {

                                        //As res sending feature purged from some fields
                                        Feature.findOne({ _id: featureUpdated._id})
                                            .select('-rbac')
                                            .exec(function(err, featureFounded) {
                                                if(err) {
                                                    return res.status(400).json({'err': err.message});
                                                } else
                                                {
                                                    return res.status(200).json(
                                                        {'feature': featureFounded, 'message': 'Feature updated' }
                                                    );
                                                }
                                            });

                                    }
                                });
                            }
                        } else {
                            //Updating not possible
                            return res.status(400).json({'feature': feature, 'err': 'Feature exists' });
                        }
                });
            } else {
                return res.status(404).json({'err': 'Id not found'});
            }
        });
    }
};

// DELETE a single Feature
exports.delete = function(req, res) {
    // todo
    // use :id validation over {ObjectId}

    var id = req.params.id;

    Feature.findByIdAndRemove({ _id: id }, function(err, feature){
        if(err) {
            return res.status(400).json({'err': err.message});
        } else if(!feature) {
            return res.status(404).json({'err': 'Id not found'});
        }
        return res.status(200).json({'message': 'Feature deleted'});
    });
};