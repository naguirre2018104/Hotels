"use strict"

const User = require("../models/user-model");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function prueba(req,res){
    res.status(200).send({message: "Funcionando"});
}

function userAdmin(){
    var user = new User();

    User.findOne({username: "admin"},(err,adminFinded)=>{
        if(err){
            console.log(err);
        }else if(adminFinded){
            console.log("Usuario admin ya fue creado");
        }else{
            bcrypt.hash(12345,null,null,(err,passwordHashed)=>{
                if(err){
                    console.log("Error al encriptar contraseña de admin");
                }else if(passwordHashed){
                    user.password = passwordHashed;
                    user.name = "admin";
                    user.username = "admin";
                    user.role = "ROLE_ADMIN";
                    user.save((err,userSaved)=>{
                        if(err){
                            console.log("Error al crear usuario admin");
                        }else if(userSaved){
                            console.log("Usuario admin creado exitosamente");
                        }else{
                            console.log("No se creó el usuario admin");
                        }
                    })
                }else{
                    console.log("Contraseña de admin no encriptada");
                }
            })
        }
    })
}

function register(req,res){
    var user = new User();
    var params = req.body;

    if(params.name && params.username && params.password && params.email){
        User.findOne({username: params.username},(err,userFinded)=>{
            if(err){
                return res.status(500).send({message: "Error al buscar usuario"});
            }else if(userFinded){
                return res.send({message: "Nombre de usuario ya utilizado"});
            }else{
                bcrypt.hash(params.password,null,null,(err,passwordHashed)=>{
                    if(err){
                        return res.status(500).send({message: "Error al encriptar contraseña"});
                    }else if(passwordHashed){
                        user.password = passwordHashed;
                        user.name = params.name;
                        user.lastname = params.lastname;
                        user.username = params.username;
                        user.email = params.email;
                        user.save((err,userSaved)=>{
                            if(err){
                                return res.status(500).send({message: "Error al guardar usuario"});
                            }else if(userSaved){
                                return res.send({message: "Usuario agregado exitosamente", userSaved});
                            }else{
                                return res.status(500).send({message: "No se guardó el usuario"});
                            }
                        })
                    }else{
                        return res.status(401).send({message: "Contraseña no encriptada"});
                    }
                })
            }
        })
    }else{
        return res.send({message: "Ingrese los datos mínimos"});
    }
}

function login(req,res){
    var params = req.body;
    
    if(params.username && params.password){
        User.findOne({username: params.username}, (err, userFinded)=>{
            if(err){
                return res.status(500).send({message: "Error al buscar usuario"});
            }else if(userFinded){
                bcrypt.compare(params.password, userFinded.password, (err, checkPassword)=>{
                    if(err){
                        return res.status(500).send({message: "Error al comparar contraseñas"});
                    }else if(checkPassword){
                        if(params.gettoken){
                            return res.send({ token: jwt.createToken(userFinded), userFinded});
                        }else{
                            return res.send({ message: "Usuario logeado", userFinded});
                        }
                    }else{
                        return res.status(401).send({message: "Contraseña incorrecta"});
                    }
                })
            }else{
                return res.send({message: "Usuario inexistente"});
            }
        })
    }else{
        return res.status(401).send({message: "Ingrese los datos mínimos"});
    }
}

function updateUser(req, res){
    let userId = req.params.id;
    let update = req.body;

    if(userId != req.user.sub){
        return res.status(401).send({ message: "No tienes permiso para actualizar a este usuario"});
    }else{
        if(update.password || update.role){
            return res.status(401).send({ message: "No se puede actualizar la contraseña ni el rol"});
        }else{
            if(update.username){
                User.findOne({username: update.username}, (err, userFinded)=>{
                    if(err){
                        return res.status(500).send({ message: "Error al buscar usuario"});
                    }else if(userFinded){
                        if(userFinded._id == req.user.sub){
                            User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                                if(err){
                                    return res.status(500).send({message: "Error al intentar actualizar"});
                                }else if(userUpdated){
                                    return res.send({message: "Usuario actualizado exitosamente", userUpdated});
                                }else{
                                    return res.send({message: "No se actualizó"});
                                }
                            })
                        }else{
                            return res.send({message: "Nombre de usuario ya utilizado"});
                        }
                    }else{
                        User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                            if(err){
                                return res.status(500).send({message: "Error al intentar actualizar"});
                            }else if(userUpdated){
                                return res.send({message: "Usuario actualizado exitosamente", userUpdated});
                            }else{
                                return res.send({message: "No se actualizó"});
                            }
                        })
                    }
                })
            }else{
                User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated)=>{
                    if(err){
                        return res.status(500).send({message: "Error al intentar actualizar"});
                    }else if(userUpdated){
                        return res.send({message: "Usuario actualizado exitosamente", userUpdated});
                    }else{
                        return res.send({message: "No se actualizó"});
                    }
                })
            }
        }
    } 
}

function removeUser(req, res){
    let userId = req.params.id;
    let params = req.body;

    if(userId != req.user.sub){
        return res.status(403).send({message: "No tienes permiso para eliminar a este usuario"});
    }else{
        User.findOne({_id: userId}, (err, userFinded)=>{
            if(err){
                return res.status(500).send({message: "Error al buscar usuario"});
            }else if(userFinded){
                bcrypt.compare(params.password, userFinded.password, (err, checkPassword)=>{
                    if(err){
                        return res.status(500).send({message: "Error al comparar las contraseñas"});
                    }else if(checkPassword){
                        User.findByIdAndRemove(userId, (err, userRemoved)=>{
                            if(err){
                                return res.status(500).send({message: "Error al intentar eliminar"});
                            }else if(userRemoved){
                                return res.send({message: "Usuario eliminado exitosamente", userRemoved});
                            }else{
                                return res.status(403).send({message: "No se eliminó"});
                            }
                        })
                    }else{
                        return res.status(401).send({message: "Contraseña incorrecta, se necesita tu contraseña para eliminar tu cuenta"});
                    }
                })
            }else{
                return res.status(403).send({message: "Usuario inexistente"});
            } 
        })
    }
}

module.exports = {
    prueba,
    userAdmin,
    register,
    login,
    updateUser,
    removeUser
}