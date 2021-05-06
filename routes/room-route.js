"use strict"

const express = require("express");
const roomController = require("../controllers/room-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/pruebaRoom", roomController.prueba);

module.exports = api;