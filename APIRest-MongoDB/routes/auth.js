const express = require('express');
//const config = require('config');
const { SEED, experation } = require('../config');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcrypt');
//const Joi = require('@hapi/joi');
const ruta = express.Router();

ruta.post('/', (req, res) => {
    Usuario.findOne({email: req.body.email})
        .then(datos => {
            if(datos) {
                const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
                if(!passwordValido) return res.status(400).json({
                    error: 'ok',
                    msj: 'Usuario o contraseña incorrecta.'
                })
                const jwtoken = jwt.sign({
                    data: { 
                        _id: datos._id,
                        nombre: datos.nombre,
                        email: datos.email 
                    }
                  }, SEED, { expiresIn: experation });
                /* jwt.sign({
                    _id: datos._id,
                    nombre: datos.nombre,
                    email: datos.email
                }, 'password') */
                res.json({
                    usuario: {
                        _id: datos._id,
                        nombre: datos.nombre,
                        email: datos.email
                    }, jwtoken});
            } else {
                res.status(400).json({
                    error: 'ok',
                    msj: 'Usuario o contraseña incorrecta.'
                });
            }
        })
        .catch(err => {
            res.status(400).json({
                error: 'ok',
                msj:'Error en el servicio' + err
            })
        })
})

module.exports = ruta;