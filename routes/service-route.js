"use strict";

const express = require("express");
const serviceController = require("../controllers/service-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/pruebaService", serviceController.prueba);

api.post(
    "/createService", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    serviceController.createServices
);

api.get(
    "/getServices", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    serviceController.getServices
);

api.get(
    "/getService/:id", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    serviceController.getService
);

api.put(
    "/updateService/:id", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    serviceController.updateService
);

api.delete(
    "/deleteService/:id", [mdAuth.ensureUser, mdAuth.ensureAdminHotel],
    serviceController.deleteService
);

module.exports = api;