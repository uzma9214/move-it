const { mongoose } = require("mongoose");


const vehicleSchema = new mongoose.Schema({

name :{
    type : String,
    required : true
},
image : {
    type : String,
    required : true
},
description : {
    type : String,
    required : true
},
registration : {
    type : String,
    required : [true, "Registration Already Exist"],
    unique : true
},
capacity : {
    type : Number,
    required : true
},
isAvailable : {
    type : Boolean,
    required : true
},
rate : {
    type : Number,
    required : true
}
},
{
  timestamps : true
})
module.exports = mongoose.model("Vehicle" , vehicleSchema)