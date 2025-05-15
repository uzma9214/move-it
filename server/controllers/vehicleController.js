const Vehicle = require("../models/vehiclemodel")

const getVehicles = async (req,res) => {

    const vehicles = await Vehicle.find()
if(!vehicles){
    res.status(404)
    throw new Error('Vehicles Not Found!!')
}

res.status(200).json(vehicles)
}



const getVehicle = async (req,res) => {

    const vehicle = await Vehicle.findById(req.params.id)

if(!vehicle){
    res.status(404)
    throw new Error('Vehicle Not Found!!')
}

res.status(200).json(vehicle)
}





module.exports = { getVehicles, getVehicle }