require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/database')
const config = require('./config/config')


const PORT = config.port;
connectDB() // Connect to MongoDB

//server
app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:"+PORT);
})