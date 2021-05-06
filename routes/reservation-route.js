"use strict"

const express = require("express");
const reservationController = require("../controllers/reservation-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/pruebaReservation", reservationController.prueba);

module.exports = api;