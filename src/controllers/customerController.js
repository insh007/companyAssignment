const customerModel = require('../models/customerModel')
const shortId = require('shortid')
let {isValidFirstName, isValidLastName, isValidMail, isValidDOB, isValidMobile} = require('../validation/validation')

const createCustomer = async function(req,res){
    try{

        let {firstName,lastName,mobileNumber,DOB,emailID,status} = req.body
    
        /*---------------------checking fields are present or not-----------------------*/
        if(!firstName)return res.status(400).send({status:false, message:"first name is required"})
        if(!lastName)return res.status(400).send({status:false, message:"last name is required"})
        if(!mobileNumber)return res.status(400).send({status:false, message:"mobile number is required"})
        if(!DOB)return res.status(400).send({status:false, message:"DOB is required"})
        if(!emailID)return res.status(400).send({status:false, message:"email Id is required"})

        if(status){
            if(status.toUpperCase()!='ACTIVE' && status.toUpperCase()!='INACTIVE')return res.status(400).send({status:false, message:"please provide valid status ex: active or inactive"})
        }

        /*-----------------------------regex validation------------------------------*/
        if(!(isValidFirstName(firstName))){return res.status(400).send({status:false, message:"please provide valid first name"})}
        if(!(isValidLastName(lastName)))return res.status(400).send({status:false, message:"please provide valid last name"})
        if(!(isValidMobile(mobileNumber)))return res.status(400).send({status:false, message:"please provide valid mobile number exactly 10 digits"})
        if(!(isValidDOB(DOB)))return res.status(400).send({status:false, message:"please provide valid DOB in yyyy-mm-dd format"})
        if(!(isValidMail(emailID)))return res.status(400).send({status:false, message:"please provide valid email Id"})

        /*---------------------checking duplicate mobile number-----------------------*/
        const duplicateMobile = await customerModel.findOne({mobileNumber:mobileNumber})
        if(duplicateMobile)return res.status(400).send({status:false, message:`${mobileNumber} number is already registerd`})

        /*---------------------checking duplicate email Id-----------------------*/
        const duplicateEmail = await customerModel.findOne({emailID : emailID})
        if(duplicateEmail)return res.status(400).send({status:false, message:`${emailID} email is already registered`})

        let generateId = shortId.generate()
        req.body.customerID = generateId

        req.body.DOB = Date.parse(DOB) //convert string to number(date) type
        
        const createData = await customerModel.create(req.body)
        return res.status(201).send({status:true, data:createData})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

const getCustomers = async function(req,res){
    try{
        let fetch = await customerModel.find({status:"ACTIVE"})
        if(fetch.length==0)return res.status(404).send({status:false, message:"No cutomer exists with active status"})

        return res.status(200).send({status:true, message:fetch})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}

const deleteCustomer = async function(req,res){
    try{
        const customerId = req.params.customerId
        
        let findCustomer = await customerModel.findOne({customerID:customerId})
        if(!findCustomer)return res.status(404).send({status:false, message:`no customer exists with ${customerId} customerID`})

        await customerModel.deleteOne({customerID:customerId})
        return res.status(204).send({status:true, message:'delete successfully'})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}
module.exports = {createCustomer, getCustomers, deleteCustomer}