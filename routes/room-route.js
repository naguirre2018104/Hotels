"use strict";

const express = require("express");
const roomController = require("../controllers/room-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.post(
    "/createRoom/:idH", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    roomController.createRoom
);
api.get(
    "/getRooms", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    roomController.getRooms
);
api.post(
    "/getRoom/:idR", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    roomController.getRoom
);

module.exports = api;