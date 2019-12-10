'use strict';

var mongoose = require('mongoose');

var FeatureSchema = new mongoose.Schema({
        name: {
            type: String,
            unique: true,
            required: [true, 'Name is required']
        },
        i18n: {
            type: String,
            unique: true,
            required: [true, 'i18n is required']
        },
        sref: {
            type: String,
            unique: true,
            required: [true, 'Routing is required']
        },
        rbac: {
            users: [
                {
                    _actor: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User'
                    },
                    value: { type: Number, min: 100, max: 300, default: 0 },
                    owner: {
                        type: Boolean,
                        default: false
                    }
                }
            ]

    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Feature', FeatureSchema);
