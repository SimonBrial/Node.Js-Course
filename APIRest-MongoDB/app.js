// Importaciones
const usuarios = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config');


/* LO QUE DEBERIA IR EN "configDB" EN EL ARCHIVO DE "development.json es
    "configDB": {
        "PORT": "3000",
        "MONGO_URI": "mongodb+srv://simonbrial:24917851@cluster0.uwilh.mongodb.net/APIRest-MongoDB?retryWrites=true&w=majority" 
    }
"*/

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
    })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log('No se pudo conectar a la base de datos', err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/usuarios', usuarios);
app.use('/api/cursos', cursos);
app.use('/api/auth', auth); 

// Configuracion del puerto y conexion
app.listen(PORT, () => {
    console.log(`API RESTful OK y ejecutandose en el puerto ${PORT}`);
})  