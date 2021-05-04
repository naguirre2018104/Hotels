"use strict"

const express = require("express");
const userController = require("../controllers/user-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/prueba", userController.prueba);
api.post("/register",userController.register);
api.post("/login",userController.login);
api.put("/updateUser/:id",mdAuth.ensureUser,userController.updateUser);
api.put("/removeUser/:id",mdAuth.ensureUser,userController.removeUser);

module.exports = api;