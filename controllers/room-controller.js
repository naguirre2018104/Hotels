"use strict"

function prueba(req,res){
    res.status(200).send({message: "Funcionando room"});
}

module.exports = {
    prueba
}