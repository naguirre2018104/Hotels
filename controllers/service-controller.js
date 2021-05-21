"use strict";

const Services = require("./../models/service-model");

function prueba(req, res) {
    res.status(200).send({ message: "Funcionando service" });
}

function createServices(req, res) {
    let services = new Services();
    let params = req.params;

    if (!params.name && params.price_service) {
        return res
            .status(400)
            .send({ ok: false, message: "Ingrese sus datos obligatorios" });
    } else {
        Services.findOne({ name: params.name.toLowerCase() },
            (err, serviceFound) => {
                if (err) {
                    return res.status(500).send({ ok: false, message: "Error general" });
                } else if (serviceFound) {
                    return res
                        .status(400)
                        .send({ ok: false, message: "Ya existe esta habitacion" });
                } else {
                    services.name = params.name.toLowerCase();
                    services.price_service = params.price_service;

                    services.save((err, serviceSaved) => {
                        if (err) {
                            return res
                                .status(500)
                                .send({ ok: false, message: "Error general" });
                        } else if (serviceSaved) {
                            return res.send({
                                ok: true,
                                message: "Servicio creado correctamente",
                                serviceSaved,
                            });
                        } else {
                            return res.status(404).send({
                                ok: false,
                                message: "No se guardo correctamente el servicio",
                            });
                        }
                    });
                }
            }
        );
    }
}

function getServices(req, res) {
    Services.find({}).exec((err, services) => {
        if (err) {
            return res.status(500).send({ ok: false, message: "Error general" });
        } else if (services) {
            return res.send({ ok: true, message: "Servicios encontrados", services });
        } else {
            return res.status(404).send({ ok: false, message: "Sin servicios" });
        }
    });
}

function getService(req, res) {
    let servicesId = req.params.id;

    if (!servicesid) {
        return res.status(400).send({ ok: false, message: "Error, ServicesID" });
    } else {
        Services.findById(servicesId).exec((err, service) => {
            if (err) {
                return res.status(500).send({ ok: false, message: "Error general" });
            } else if (service) {
                return res.send({ ok: true, message: "Servicio encontrado", service });
            } else {
                return res.status(404).send({ ok: false, message: "No servicio" });
            }
        });
    }
}

function updateService(req, res) {
    let servicesId = req.params.id;
    let update = req.body;

    if (!servicesId) {
        return res
            .status(403)
            .send({ ok: false, message: "Ingrese los parametros" });
    } else {
        Services.findByIdAndUpdate(
            servicesId,
            update, { new: true },
            (err, serviceUpdated) => {
                if (err) {
                    return res.status(500).send({ ok: false, message: "Error general" });
                } else if (serviceUpdated) {
                    return res.send({
                        ok: false,
                        message: "Servicio actualizado",
                        serviceUpdated,
                    });
                } else {
                    return res.status(404).send({
                        ok: false,
                        message: "Error, no se logro actualizar la habitacion",
                    });
                }
            }
        );
    }
}

function deleteService(req, res) {
    let serviceId = req.params.id;

    if (!serviceId) {
        return res
            .status(403)
            .send({ ok: false, message: "Ingrese los datos necesarios" });
    } else {
        Services.findById(serviceId, (err, serviceFound) => {
            if (err) {
                return res.status(500).send({ ok: false, message: "Error General" });
            } else if (serviceFound) {
                Services.findByIdAndDelete(serviceId, (err, serviceRemoved) => {
                    if (err) {
                        return res
                            .status(500)
                            .send({ ok: false, message: "Error general" });
                    } else if (serviceRemoved) {
                        return res.send({ ok: true, message: "Servicio eliminado" });
                    } else {
                        return res.status(400).send({
                            ok: false,
                            message: "No se logro eliminar la habitacion",
                        });
                    }
                });
            } else {
                return res
                    .status(404)
                    .send({ ok: false, message: "No existe el servicio" });
            }
        });
    }
}

module.exports = {
    prueba,
    createServices,
    deleteService,
    getService,
    getServices,
    updateService,
};