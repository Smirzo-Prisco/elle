'use strict';

var mongoose = require('mongoose');

var MenuSchema = new mongoose.Schema(
    {
        item: {
            type: mongoose.Schema.Types.ObjectId,
                ref: 'Feature'
        },
        parent_id: mongoose.Schema.Types.ObjectId,
        order: Number
    });

//var MenuSchema = new mongoose.Schema({menu:[ MenuSchemaContent ]});

mongoose.model('Menu', MenuSchema);