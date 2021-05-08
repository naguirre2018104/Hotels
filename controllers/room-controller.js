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

module.exports = {
    createRoom,
    getRooms,
    getRoom,
};