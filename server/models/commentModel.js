const { mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({

    user: {
        type : mongoose.Schema.Types.ObjectId,
         ref : 'User',
         required : true
    
    },
    booking : {
         type : mongoose.Schema.Types.ObjectId,
         ref : 'Booking',
         required : true
    },
    text : {
       type : String,
       required : true
    },

    isAdmin : {
        type : Boolean,
        default :false,
       required : true
    },

},{
    timestamps : true
})

module.exports = mongoose.model('Comment', commentSchema)