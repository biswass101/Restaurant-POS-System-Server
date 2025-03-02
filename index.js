require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/database')


const PORT = process.env.PORT || 3000
connectDB() // Connect to MongoDB


app.listen(PORT, () => {
    console.log("Server listening on: http://localhost:"+PORT);
})