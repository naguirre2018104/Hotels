"use strict";

const express = require("express");
const eventController = require("../controllers/event-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/pruebaEvent", eventController.prueba);

api.post(
    "/createEvent", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    eventController.createEvent
);

api.get(
    "/getEvents", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    eventController.getEvents
);

api.get(
    "/getEvent/:id", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    eventController.getEvent
);

api.put(
    "/updateEvent/:id", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    eventController.updateEvent
);

api.delete(
    "/deleteEvent/:id", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    eventController.deleteEvent
);

module.exports = api;