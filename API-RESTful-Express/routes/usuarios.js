const express = require('express');
const Joi = require('@hapi/joi');
const ruta = express.Router();

const users = [
    {id:1, nombre: 'Simon'},
    {id:2, nombre: 'Antonio'},
    {id:3, nombre: 'Briceño'},
    {id:4, nombre: 'Alvarez'}
]

ruta.get('/', (req, res) => {
    res.send(users);
}); 

ruta.get('/:id', (req, res) => {
    let user = existeUsuario(req.params.id);
    if (!user) {
        res.status(404).send('El usuario no fue encontrado');
    }
    res.send(user)
});

ruta.post('/', (req, res) => {
    // Validacion con "Joi"
    const schema = Joi.object({
        nombre: Joi
            .string()
            .min(3)
            .max(30)
            .required()
    });

    const {error, value} = schema.validate({ nombre: req.body.nombre});
    if (!error) {
        const usuario = {
            id: users.length + 1,
            nombre: value.nombre
        }
        users.push(usuario);
        res.send(usuario) 
    } else {
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
    }
    
    // Validacion Simple
    /* if(!req.body.nombre) {
        res.status(400).send('Debe ingresar un nombre');
        return;
    }
    const usuario = {
        id: users.length + 1,
        nombre: req.body.nombre
    }
    users.push(usuario);
    res.send(usuario) */
})

ruta.put('/:id', (req, res) => {
    // conseguir si existe el objeto "Usuario"
    // let user = users.find(userSearch => userSearch.id === parseInt(req.params.id))
    let user = existeUsuario(req.params.id)
    if (!user) {
        res.status(404).send('El usuario no fue encontrado');
        return;
    }

    const {error, value} = validarUsuario(req.body.nombre);

    if (error) {
        const mensaje = error.details[0].message;
        res.status(400).send(mensaje);
        return;
    }

    user.nombre = value.nombre;
    res.send(user);
});

ruta.delete('/:id', (req, res) => {
    let user = existeUsuario(req.params.id)
    if (!user) {
        res.status(404).send('El usuario no fue encontrado');
        return;
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(users);
});

function existeUsuario(id) {
    return users.find(userSearch => userSearch.id === parseInt(id));
}

function validarUsuario(name) {
    const schema = Joi.object({
        nombre: Joi
            .string()
            .min(3)
            .max(30)
            .required()
    })
    return schema.validate({ nombre: name });
}

module.exports = ruta;