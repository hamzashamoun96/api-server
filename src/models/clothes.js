'use strict';
const mongoose = require('mongoose');

const clothesSchema = new mongoose.Schema({
    cloth: { type: String, require: true }
});

const clothesModel = mongoose.model('cloth', clothesSchema);
module.exports = clothesModel;