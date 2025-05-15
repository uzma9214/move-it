const express = require("express")
const connectDB = require("./config/dbconfig")
require ('dotenv').config()
const colors = require('colors')
const errorHandler = require("./middleware/errorHandler")


const app = express()
const PORT = process.env.PORT || 5000


// DB CONNECTION
connectDB()

// BODY-PARSER
app.use(express.json())
// app.use(express.urlencoded({extended: true}))
app.use(express.urlencoded())


app.get("/", (req,res) => {
    res.status(200).json({
        msg: "WELCOME TP MOVEIT API 1.0"
    })
})


// Auth Routes
app.use("/api/auth" , require("./routes/authRoutes"))



// Vehicle Routes
app.use("/api/vehicle" , require("./routes/vehicleRoutes"))

// Admin Routes
app.use("/api/admin" , require("./routes/adminRoutes"))



// Booking Routes

app.use("/api/booking" , require("./routes/bookingRoute"))


// Error Handler
app.use(errorHandler)

app.listen(PORT , () => console.log(`Server is running at PORT :${PORT}` .bgBlue) )