"use strict"

const Hotel = require("../models/hotel-model");
const User = require("../models/user-model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function createHotel(req,res){
    var user = new User();
    var hotel = new Hotel();
    var params = req.body;

    if(params.name && params.address && params.country){
        
    }else{
        return res.send({message: "Ingrese los datos mínimos"});
    }
}

module.exports = {

}