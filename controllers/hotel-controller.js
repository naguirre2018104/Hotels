"use strict"

const Hotel = require("../models/hotel-model");
const User = require("../models/user-model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function prueba(req,res){
    res.status(200).send({message: "Funcionando hotel"});
}

function createHotel(req,res){
    var user = new User();
    var hotel = new Hotel();
    var params = req.body;

    
}

module.exports = {
    prueba
}