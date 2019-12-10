'use strict';

var mongoose = require('mongoose');

var appDataSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Application name is required']
    },
    author: {
        type: String,
        unique: true,
        required: [true, 'Author name is required']
    },
    description: {
        type: String,
        unique: true,
        required: [true, 'Description is required']
    },
    version: {
        type: String,
        unique: true,
        required: [true, 'Version is required']
    },
    year: {
        type: String,
        unique: true,
        required: [true, 'App year is required'],
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('AppData', appDataSchema);