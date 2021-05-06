"use strict"

function prueba(req,res){
    res.status(200).send({message: "Funcionando invoice"});
}

module.exports = {
    prueba
}