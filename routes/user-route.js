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
api.get("/getUsers",[mdAuth.ensureUser,mdAuth.ensureAdmin],userController.getUsers);
api.get("/getUser/:id",[mdAuth.ensureUser,mdAuth.ensureAdmin],userController.getUser);

module.exports = api;