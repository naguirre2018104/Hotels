"use strict"

const express = require("express");
const serviceController = require("../controllers/service-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/pruebaService", serviceController.prueba);

module.exports = api;