"use strict"

const express = require("express");
const eventController = require("../controllers/event-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/pruebaEvent", eventController.prueba);

module.exports = api;