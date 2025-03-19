require('dotenv').config();

const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: 'mongodb://localhost:27017/POSDB',
    nodeEnv: process.env.NODE_ENV || 'development',
    accessTokenSecret: process.env.JWT_SECRET
})


module.exports = config