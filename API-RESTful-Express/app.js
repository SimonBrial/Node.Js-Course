const inicioDebug = require('debug')('app:inicio');
const usuarios = require('./routes/usuarios');
const DbDebug = require('debug')('app:db');
const express = require('express');
const config = require('config');
const { PORT } = require('./config');
const morgan = require('morgan');
const app = express();

app.use(express.json());
app.use('/api/usuarios', usuarios);

// Configuracion de entornos
console.log('Aplicacion ' + config.get('nombre'));
console.log('BD server: ' + config.get('configDB.host'))

// Uso de un middleware de tercero - Morgan
if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    //console.log('Morgan habilitado');
    inicioDebug('Morgan esta habilitado');
}

// Trabajos con la DB
DbDebug('conectando con la DB');

//app.get()      //Lectura
//app.post();    // Crear
//app.put();     // Actualizar
//app.delete();  // Eliminar 

app.get('/', (req, res) => {
    res.send('Hola Mundo desde Express');
}); 

app.listen(PORT,  () => {
    console.log('El servidor esta en el puerto ' + PORT);
});
