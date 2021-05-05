"use strict"

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var hotelSchema = Schema({
    user_admin: {type: Schema.ObjectId, ref="user"},
    name: String,
    address: String,
    count_reservations: Number,
    country: String,
    image: String,
    rooms: [],
    events: []
})

module.exports = mongoose.model("hotel",hotelSchema);