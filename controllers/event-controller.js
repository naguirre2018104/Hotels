"use strict"

function prueba(req,res){
    res.status(200).send({message: "Funcionando event"});
}

module.exports = {
    prueba
}