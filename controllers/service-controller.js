"use strict"

function prueba(req,res){
    res.status(200).send({message: "Funcionando service"});
}

module.exports = {
    prueba
}