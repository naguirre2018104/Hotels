"use strict";

const Room = require("./../models/room-model");
const Hotel = require("./../models/hotel-model");

function createRoom(req, res) {
    let room = new Room();
    let hotelId = req.params.idH;
    let params = req.body;

    if (!params.name && !params.price_for_day) {
        return res
            .status(400)
            .send({ ok: false, message: "Ingrese los datos necesarios" });
    } else {
        Room.findOne({ name: params.name.toLowerCase() }, (err, roomFound) => {
            if (err) {
                return res.status(500).send({ ok: false, message: "Error general" });
            } else if (roomFound) {
                return res
                    .status(400)
                    .send({ ok: false, message: "Ya existe esta habitacion" });
            } else {
                room.name = params.name.toLowerCase();
                room.price_for_day = params.price_for_day;

                room.save((err, roomSaved) => {
                    if (err) {
                        return res
                            .status(500)
                            .send({ ok: false, message: "Error general" });
                    } else if (roomSaved) {
                        Hotel.findByIdAndUpdate(
                            hotelId, { $push: { rooms: roomSaved._id } }, { new: true },
                            (err, hotelUpdate) => {
                                if (err) {
                                    return res
                                        .status(500)
                                        .send({ ok: false, message: "Error general" });
                                } else if (hotelUpdate) {
                                    return res.send({
                                        ok: true,
                                        message: "Habitacion creada correctamente",
                                        roomSaved,
                                    });
                                } else {
                                    return res.status(404).send({
                                        ok: false,
                                        message: "No se guardo correctamente la habitacion del hotel",
                                    });
                                }
                            }
                        );
                    } else {
                        return res
                            .status(403)
                            .send({ ok: false, message: "No se logro crear la habitacion" });
                    }
                });
            }
        });
    }
}

function getRooms(req, res) {
    Room.find({}).exec((err, rooms) => {
        if (err) {
            return res.status(500).send({ ok: false, message: "Error general" });
        } else if (rooms) {
            return res.send({ ok: true, message: "Habitaciones encontadas", rooms });
        } else {
            return res.status(404).send({ ok: false, message: "No habitaciones" });
        }
    });
}

function getRoom(req, res) {
    let roomId = req.params.idR;

    if (!roomId) {
        return res.status(400).send({ ok: false, message: "Error, no RoomID" });
    } else {
        Room.findId(roomId).exec((err, rooms) => {
            if (err) {
                return res.status(500).send({ ok: false, message: "Error general" });
            } else if (rooms) {
                return res.send({
                    ok: true,
                    message: "Habitaciones encontadas",
                    rooms,
                });
            } else {
                return res.status(404).send({ ok: false, message: "No habitaciones" });
            }
        });
    }
}

function updateRoom(req, res) {
    let roomId = req.params.idR;
    let update = req.body;

    if (!roomId) {
        return res
            .status(403)
            .send({ ok: false, message: "Ingrese los parametros" });
    } else {
        Room.findByIdAndUpdate(
            roomId,
            update, { new: true },
            (err, roomUpdated) => {
                if (err) {
                    return res.status(500).send({ ok: false, message: "Error general" });
                } else if (roomUpdated) {
                    return res.send({
                        ok: false,
                        message: "Habitacion actualizada",
                        roomUpdated,
                    });
                } else {
                    return res.status(404).send({
                        ok: false,
                        message: "Eror, no se logro actualizar la habitacion",
                    });
                }
            }
        );
    }
}

function deleteRoom(req, res) {
    let roomId = req.params.idR;

    if (!roomId) {
        return res
            .status(403)
            .send({ ok: false, message: "Ingresa los datos necesarios" });
    } else {
        Room.findById(roomId, (err, roomFound) => {
            if (err) {
                return res.status(500).send({ ok: false, message: "Error general" });
            } else if (roomFound) {
                if (!roomFound.available) {
                    return res.status(403).send({
                        ok: false,
                        message: "No puede eliminar esta habitacion, esta ocupada",
                    });
                } else {
                    Room.findByIdAndDelete(roomId, (err, roomRemoved) => {
                        if (err) {
                            return res
                                .status(500)
                                .send({ ok: false, message: "Error general" });
                        } else if (roomRemoved) {
                            return res.send({
                                ok: true,
                                message: "Habitacion eliminada correctamente",
                            });
                        } else {
                            return res.status(400).send({
                                ok: false,
                                message: "No se logro eliminar la habitacion",
                            });
                        }
                    });
                }
            } else {
                return res
                    .status(404)
                    .send({ ok: false, message: "No existe la habitacion" });
            }
        });
    }
}

module.exports = {
    createRoom,
    getRooms,
    getRoom,
    updateRoom,
    deleteRoom,
};