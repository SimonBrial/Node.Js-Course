const jwt =require('jsonwebtoken');
const { SEED } = require('../config');

let verificarToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({err})
        }
        req.usuario = decoded.usuario;
        next();
    })
};

module.exports = verificarToken;