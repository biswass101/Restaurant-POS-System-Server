require('dotenv').config();

const config = Object.freeze({
    port: process.env.PORT || 3000,
    databaseURI: process.env.databaseURI,
    nodeEnv: process.env.NODE_ENV || 'development',
    accessTokenSecret: process.env.JWT_SECRET
})


module.exports = config