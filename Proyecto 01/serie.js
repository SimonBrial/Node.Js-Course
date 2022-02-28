// Serie de Fibonacci
// 1 1 2 3 5 8 13 21 34

const fs = require('fs');

let creaSerie = (cantidad) => {

    return new Promise((resolve, reject) => {
        let fibo1 = 1;
        let fibo2 = 1;
        let serie = '';

        serie += `${fibo1}\t`

        console.log(`${fibo1}`);

        for(let i=2; i<=cantidad; i++) {
            serie += `${fibo2}\t`;
            fibo2 = fibo1 + fibo2;
            fibo1 = fibo2 - fibo1;
        };

        fs.writeFile('fibonacci.txt', serie, (err) => {
            if (err) {
                reject ('Error al crear el archivo')
            } else {
                resolve ('El archivo fue creado con exito')
            }
        })
    })

}



module.exports = {
    creaSerie
};