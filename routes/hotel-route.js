"use strict"

const express = require("express");
const hotelController = require("../controllers/hotel-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/pruebaHotel", hotelController.prueba);

module.exports = api;