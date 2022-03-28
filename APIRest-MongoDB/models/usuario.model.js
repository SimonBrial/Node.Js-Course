const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
    imagen: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);