const Booking= require("../models/bookingModel")
const Vehicle = require("../models/vehiclemodel")


// Get Coordinates

async function getCoordinates(city) {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${city}&format=json`);
    const data = await res.json();
    return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
    };
}

// Get Harvshine
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}


async function getDistance(city1, city2) {
    const loc1 = await getCoordinates(city1);
    const loc2 = await getCoordinates(city2);
    const distance = haversine(loc1.lat, loc1.lon, loc2.lat, loc2.lon);
    return distance
}



const addBooking = async (req, res) => {


// Get vehicle
const vehicle = await Vehicle.findById(req.params.uid)

if(!vehicle){
    res.status(404)
    throw new Error('Vehicle Not Found!!')
}
 
// Check if all fields are coming
const { pickupLocation , dropLocation, weight } = req.body


if(!pickupLocation || !dropLocation || !weight ){
    res.status(400)
    throw new Error('Please  Fill All Details')
}

const calculatedDistance =   await  getDistance(pickupLocation , dropLocation)

const newBooking = await Booking.create({
    user : req.user._id,
    vehicle : vehicle._id,
    pickupLocation : pickupLocation,
    dropLocation : dropLocation,
    distance : calculatedDistance.toFixed(2),
    weight : weight,
    estimatedDeliveryTime : "1 Day",
    totalBill : calculatedDistance.toFixed(2) * vehicle.rate,
    status : "pending"

})

if (!newBooking){
    res.status(400)
    throw new Error("Booking Not Added")
}

    res.status(201).json(newBooking)

}


// Get Booking
const getBooking = async (req, res) => {
    
   const booking = await Booking.findById(req.params.bid).populate("user" , '-password').populate('vehicle')
    if (!booking){
     res.status(404)
    throw new Error('Booking Not Found!!')
    }
 
    res.status(200).json(booking)

//   res.send("Single Booking")
}


// Cancel Booking

const cancelBooking = async(req,res) => {

    // Check if admin accepeted Booking

const booking = await Booking.findById(req.params.bid)

if(!booking){
    res.status(404)
    throw new Error("Booking Not Found!!")
}

if(booking.status === "accepted"){
    res.status(400)
    throw new Error("Booking Can't Be Cancelled")
}
else{
    const cancelledBooking = await Booking.findByIdAndUpdate(req.params.bid , { status : 'cancelled' }, {new: true})

res.status(200).json(cancelledBooking)

}
}

module.exports = { addBooking, getBooking, cancelBooking }