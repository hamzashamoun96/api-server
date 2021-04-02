'use strict';
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    food: { type: String, require: true }
});

const foodModel = mongoose.model('food', foodSchema);
module.exports = foodModel;