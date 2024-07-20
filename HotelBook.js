const mongoose =require('mongoose')
const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    checkIn:{
        type:String,
        required:true
    },
    checkOut:{
        type:String,
        required:true
    },
    rooms:{
        type:Number,
        required:true
    },
    adults
    :{
       type:String,
       required:true
    },
    children:{
       type:String,
       required:true
    }
    
})
const Hotel =mongoose.model('Hotel',HotelSchema)
module.exports=Hotel