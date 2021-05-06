"use strict"

const express = require("express");
const invoiceController = require("../controllers/invoice-controller");
const mdAuth = require("../middlewares/authenticated");

var api = express.Router();

api.get("/pruebaInvoice", invoiceController.prueba);

module.exports = api;