const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const verificarToken = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi
        .string()
        .min(3)
        .max(30)
        .required(),

    password: Joi
        .string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    email: Joi
        .string()
        .email({ 
            minDomainSegments: 2, 
            tlds: {
                 allow: ['com', 'net'] 
            } 
        })
});

ruta.get('/', verificarToken, (req, res) => {
    let resultado = listarUsuarioActivos();
    resultado
        .then(usuarios => {
            res.json(usuarios);
        })
        .catch(err => {
            res.status(400).json({ err })
        });
});

ruta.post('/', (req, res) => {
    let body = req.body;
 
    Usuario.findOne({email: body.email}, (err, user) => {
        if(err) {
            return res.status(400).json({ error: 'Server Error' });
        } else if (user) {
            // Usuario si existe
            return res.status(400).json({
                msj: 'El usuario ya existe'
            });
        }
    });

    const { error, value } = schema.validate({ nombre: req.body.nombre, email: req.body.email });
    if(!error) {
        let resultado = crearUsuario(body);
        resultado
            .then( user => {
                res.json({ 
                    nombre: user.nombre,
                    email: user.email 
                 })
            })
            .catch ( err => {
                res.status(400).json({ error: err })
            })
    } else {
        res.status(400).json({ error });
    };
});

ruta.put('/:email', verificarToken, (req, res) => {
    const { error, value } = schema.validate({ nombre: req.body.nombre});

    if(!error){
        let resultado = actualizarUsuario(req.params.email, req.body);
        resultado
            .then(user => { res.json({ 
                nombre: user.nombre,
                email: user.email 
            })})
            .catch(err => { res.status(400).json({ error: err })})
    } else {
        res.json(400).json({ error })
    }

});

ruta.delete('/:email', verificarToken, (req, res) => {
    let resultado = desactivarUsuario(req.params.email);
    resultado
        .then(valor => { res.json({ 
            nombre: valor.nombre,
            email: valor.email
        })})
        .catch(err => { res.status(400).json({ err })})
});

// "body" es  una variable que se recibe desde el cliente
async function crearUsuario(body) {
    let usuario = new Usuario({
        email    : body.email,
        nombre   : body.nombre,
        password : bcrypt.hashSync( body.password, 10 )
    });
    return await usuario.save();
};

async function  listarUsuarioActivos() {
    let usuarios = await Usuario.find({ "state": true })
        .select({nombre:1, email:1})
    return usuarios;
}

async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            nombre: body.nombre,
            password: body. password
        }
    }, { new: true});
    return usuario;
}

async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate({"email": email}, {
        $set: {
            state: false
        }
    }, { new: true });
    return usuario;
}

module.exports = ruta;