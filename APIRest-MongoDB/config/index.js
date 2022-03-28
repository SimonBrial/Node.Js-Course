if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
};

module.exports = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI,
    SEED: process.env.SEED,
    experation: process.env.experation
};