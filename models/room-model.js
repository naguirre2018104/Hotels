"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var roomSchema = Schema({
    name: String,
    available: Boolean,
    price_for_day: Number,
    available_day: Date
});

module.exports = mongoose.model("room",roomSchema);