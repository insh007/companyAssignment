const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    mobileNumber : {
        type : String,
        unique: true,
        required : true
    },
    DOB : {
        type : Date,
        required : true
    },
    emailID : {
        type : String,
        unique : true,
        required : true
    },
    address : {
        type : String
    },
    customerID : {
        type : String,
        unique : true,
        required : true,
    },
    status : {
        type : String,
        uppercase: true
    }
}, {timestamps:true})

module.exports = mongoose.model('customer', customerSchema)