"use strict";

const Event = require("./../models/event-model");

function createEvent(req, res) {
    let event = new Event();
    let params = req.body;

    if (!params.name) {
        return res
            .status(400)
            .send({ ok: false, message: "Ingrese los datos necesarios" });
    } else {
        Event.findOne({ name: params.name.toLowerCase() }, (err, eventFound) => {
            if (err) {
                return res.status(500).send({ ok: false, message: "Error general" });
            } else if (eventFound) {
                return res
                    .status(400)
                    .send({ ok: false, message: "Ya existe este evento" });
            } else {
                event.name = params.name.toLowerCase();
                event.start_date = params.start_date;
                event.end_date = params.end_date;
                event.type_of_event = params.type_of_event;
                event.price_event = params.price_event;

                event.save((err, eventSaved) => {
                    if (err) {
                        return res
                            .status(500)
                            .send({ ok: false, message: "Error general" });
                    } else if (eventSaved) {
                        return res.send({
                            ok: true,
                            message: "Evento creado con exito",
                            eventSaved,
                        });
                    } else {
                        return res.status(404).send({
                            ok: false,
                            message: "No se guardo correctamente el evento",
                        });
                    }
                });
            }
        });
    }
}

function getEvents(req, res) {
    Event.find({}).exec((err, events) => {
        if (err) {
            return res.status(500).send({ ok: false, message: "Error General" });
        } else if (events) {
            return res.send({ ok: true, message: "Eventos encontrados", events });
        } else {
            return res.status(404).send({ ok: false, message: "No eventos" });
        }
    });
}

function getEvent(req, res) {
    let eventId = req.params.id;

    if (!eventId) {
        return res.status(400).send({ ok: false, message: "Error, no EventID" });
    } else {
        Event.findById(eventId).exec((err, event) => {
            if (err) {
                return res.status(500).send({ ok: false, message: "Error general" });
            } else if (event) {
                return res.send({ ok: true, message: "Evento encontrado", event });
            } else {
                return res.status(404).send({ ok: false, message: "no evento" });
            }
        });
    }
}

function updateEvent(req, res) {
    let eventId = req.params.id;
    let update = req.body;

    if (!eventId) {
        return res
            .status(403)
            .send({ ok: false, message: "Ingrese los parametros" });
    } else {
        Event.findByIdAndUpdate(
            eventId,
            update, { new: true },
            (err, eventUpdated) => {
                if (err) {
                    return res.status(500).send({ ok: false, message: "Error General" });
                } else if (eventUpdated) {
                    return res.send({
                        ok: false,
                        message: "Evento actualizado",
                        eventUpdated,
                    });
                } else {
                    return res.status(404).send({
                        ok: false,
                        message: "Error, no se logro actualizar el evento",
                    });
                }
            }
        );
    }
}

function deleteEvent(req, res) {
    let eventId = req.params.id;

    if (!eventId) {
        return res
            .status(403)
            .send({ ok: false, message: "Ingrese los datos necesarios" });
    } else {
        Event.findById(eventId, (err, eventFound) => {
            if (err) {
                return res.status(500).send({ ok: false, message: "Error General" });
            } else if (eventFound) {
                Event.findByIdAndDelete(eventId, (err, eventRemoved) => {
                    if (err) {
                        return res
                            .status(500)
                            .send({ ok: false, message: "Error General" });
                    } else if (eventRemoved) {
                        return res.send({
                            ok: true,
                            message: "Evento elimiando correctamente",
                        });
                    } else {
                        return res
                            .status(400)
                            .send({ ok: false, message: "No se logro eliminar el evento" });
                    }
                });
            } else {
                return res
                    .status(404)
                    .send({ ok: false, message: "No existe el evento" });
            }
        });
    }
}

module.exports = {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
};