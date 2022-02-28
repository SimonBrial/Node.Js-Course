const serie = require('./serie');

let argv = process.argv;
let valor = argv[2].split('=')[1];

let cantidad = valor;

serie.creaSerie(cantidad)
    .then(mensaje => console.log(mensaje))
    .catch(error => console.log(error)) 