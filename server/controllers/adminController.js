const Booking = require("../models/bookingModel")
const User = require("../models/userModel")
const Vehicle = require("../models/vehiclemodel")

const addVehicle = async (req,res) => {

const {name,  image,  description,  registration,  capacity,  isAvailable, rate } = req.body

if(!name || !image || !description || !registration || !capacity || !rate  || !isAvailable ){
    res.status(400)
throw new Error("Please Fill  All Details!!")

}


// Create Vehicle
const newVehicle = await Vehicle.create({
    name,
    image,
    description,
    registration,
    capacity,
    rate,
    isAvailable
})

if(!newVehicle){
    res.status(400)
    throw new Error('Vehicle Not created')
}
res.status(201).json(newVehicle)

}


const updateVehicle = async(req,res) => {
const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id , req.body , {new:true})

if (!updatedVehicle){
    res.status(400)
    throw new Error('Vehicle Not created')
}

res.status(200).json(updatedVehicle)


}



const removeVehicle = async(req,res) => {
const removeVehicle = await Vehicle.findByIdAndDelete(req.params.id ,)

    res.status(200).json({
id: req.params.id,
message : "Vehicle Removed"
    })
}


const getAllBookings = async(req,res) => {
  const bookings = await Booking.find()
  if(!bookings){
    res.status(404)
    throw new Error("No Bookings Found!!")
  }
  res.status(201).json(bookings)
}



const getAllUsers = async(req,res)=> {
  const users = await User.find()
  if(!users){
    res.status(404)
    throw new Error("No Users Found!!")
  }
  res.status(201).json(users)

}



const getAllVehicles = async(req,res) => {
  const  vehicles = await Vehicle.find()
  if(!vehicles){
    res.status(404)
    throw new Error("Not Vehicles Found!!")
  }
  res.status(201).json(vehicles)

}

const updateBooking  = async (req,res) => {
 
 const updatedBooking  = await Booking.findByIdAndUpdate(req.params.bid , req.body , { new : true })
   res.status(200).json(updatedBooking)

}



module.exports = { addVehicle, updateVehicle, removeVehicle, getAllBookings, getAllUsers, getAllVehicles, updateBooking }
