const serie = require('./serie');

serie.creaSerie()
    .then(mensaje => console.log(mensaje))
    .catch(error => console.log(error))