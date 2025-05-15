const mongoose = require('mongoose')


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`.bgGreen.black)
    } catch (error) {
        console.log(`ERROR IN DB CONNECTION : ${error.message}`.bgRed)
    }
}
module.exports = connectDB