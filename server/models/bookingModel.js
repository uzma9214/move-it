const {  mongoose } = require("mongoose");

const bookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    vehicle: {
         type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required : true
    },
    pickupLocation: {
        type: String,
        required: true
    },

dropLocation : {
    type: String,
        required: true
},

distance : {
   type : Number,
   required : true
},

estimatedDeliveryTime: {
    type: String,
        required: true
},
    totalBill: {
         type: Number,
        required: true
},
    
    status: {
         type: String,
         enum : ['pending', 'completed' , 'cancelled', 'accepted' ],
        default : "pending",
         required: true
        
},
    
    weight: {
         type: Number,
        required: true
    }
},
{
    
 timestamps: true

})

module.exports = mongoose.model('Booking', bookingSchema)