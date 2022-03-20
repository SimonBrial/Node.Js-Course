if(process.env.NODE_ENV !== 'porduction') {
    require('dotenv').config();
};

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI
};