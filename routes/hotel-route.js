"use strict";

const express = require("express");
const hotelController = require("../controllers/hotel-controller");
const mdAuth = require("../middlewares/authenticated");

let api = express.Router();

api.post(
    "/createHotel", [mdAuth.ensureUser, mdAuth.ensureAdmin],
    hotelController.createHotel
);
api.get("/getHotels", hotelController.getHotels);
api.post(
    "/getHotel/:idH", [mdAuth.ensureUser, mdAuth.ensureAdmin],
    hotelController.getHotel
);
api.post(
    "/updateHotel/:idH", [mdAuth.ensureUser, mdAuth.ensureAdmin],
    hotelController.updateHotel
);
api.delete(
    "/:idU/deleteHotel/:idH", [mdAuth.ensureUser, mdAuth.ensureAdmin],
    hotelController.deleteHotel
);

module.exports = api;