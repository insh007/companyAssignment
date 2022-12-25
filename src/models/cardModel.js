const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    cardNumber : {
        type : String,
        unique : true,
        required : true
    },
    cardType : {
        type : String
    },
    customerName : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "ACTIVE",
        uppercase : true
    },
    vision : {
        String
    },
    customerID : {
        type : String,
        ref : "customer",      //could not populate missing ObjectId type
        unique : true,
        required : true
    }
},{timestamps:true})

module.exports = mongoose.model('card',cardSchema)