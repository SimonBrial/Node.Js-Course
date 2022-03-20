// Importaciones
const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config');

// Conexion a la DB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    })
    .then(() => console.log('conectado a MongoDB'))
    .catch(err => console.log('No se pudo conectar a la base de datos', err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);

// Configuracion del puerto y conexion
app.listen(PORT, () => {
    console.log(`API RESTful OK y ejecutandose en el puerto ${PORT}`);
})