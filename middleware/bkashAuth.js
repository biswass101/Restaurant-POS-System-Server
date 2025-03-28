require('dotenv').config();
const axios = require('axios');
const globals = require('node-global-storage');
const createHttpError = require('http-errors')

const bkashAuth = async(req, res, next) => {
    globals.unsetValue('id_token');

    try {
        const {data} = await axios.post(process.env.bkash_grant_token_url, {
            app_key: process.env.bkash_api_key,
            app_secret: process.env.bkash_secret_key
        }, 

        {
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                username: process.env.bkash_username,
                password: process.env.bkash_password
            }
        }
    );

    globals.setValue('id_token', data.id_token, {protected: true});
    return next();    
    } catch (error) {
        next(createHttpError(401, error.message));
    }
}

module.exports = {bkashAuth};