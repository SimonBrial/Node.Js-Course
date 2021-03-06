const express = require('express');
const Curso = require('../models/cursos.model');
const verificarToken = require('../middlewares/auth');
const ruta = express.Router();

ruta.get('/', verificarToken, (req, res) => {
    let resultado = listarCursosActivos();
    resultado
        .then(cursos => {
            res.json(cursos)
        })
        .catch(err => res.state(400).json(err));
});

ruta.post('/', verificarToken, (req, res) => {
    let resultado = crearCurso(req.body);

    resultado
        .then(curso => { res.json({ curso })})
        .catch(err => { res.status(400).json({ err })})
});

ruta.put('/:id', verificarToken, (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado
        .then(curso => { res.json(curso) })
        .catch(err => { res.status(400).json(err) });
});

ruta.delete('/:id', verificarToken, (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado
        .then(curso => { res.json(curso)})
        .catch(err => { res.status(400).json(err)})
});

async function crearCurso(body) {
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion
    });
    return await curso.save();
};

async function  listarCursosActivos() {
    let cursos = await Curso.find({ "state": true });
    return cursos;
}

async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion
        }
    }, { new: true});
    return curso;
};

async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            state: false
        }
    }, { new: true });
    return curso;
}

module.exports = ruta;