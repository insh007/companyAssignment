const cardModel = require('../models/cardModel')
const customerModel = require('../models/customerModel')
const randomstring = require('randomstring')
const {isValidFullName} = require('../validation/validation')

const createCard = async function(req,res){
    try{

        let {customerName, customerID, status, cardType} = req.body
    
        /*---------------------checking fields are present or not-----------------------*/
        if(!customerName)return res.status(400).send({status:false, message:"customer full name is required"})
        if(!customerID)return res.status(400).send({status:false, message:"customerId is required"})

        
        if(status){
            if(status.trim().toUpperCase()!='ACTIVE' && status.trim().toUpperCase()!='INACTIVE')return res.status(400).send({status:false, message:"please provide valid status ex: active or inactive"})
        }

        if(!status){
            req.body.status = "ACTIVE"
        }
        
        if(cardType){
            if(cardType.trim().toUpperCase()!='REGULAR' && cardType.trim().toUpperCase()!='SPECIAL')return res.status(400).send({status:false, message:"please provide valid status ex: regular or special"})
        }
    
        /*-----------------------------regex validation------------------------------*/
        if(!(isValidFullName(customerName))){return res.status(400).send({status:false, message:"please provide valid customer full name"})}
    
        /*---------------------------checking customer is present in db or not------------------------------*/
        let findCustomer = await customerModel.findOne({customerID:customerID})
        if(!findCustomer)return res.status(404).send({status:false, message:`no customer exists with ${customerID}`})
    
        let arr = customerName.split(" ")
        let firstName = arr[0]
        let lastName = arr[1]

        let findValidCustomer = await customerModel.findOne({customerID:customerID ,firstName:firstName, lastName:lastName})
        if(!findValidCustomer)return res.status(400).send({status:false, message:`please provide registered fullName corresponding to ${customerID} customer Id` })

        let duplicateCustomer = await cardModel.findOne({customerID:customerID})
        if(duplicateCustomer)return res.status(400).send({status:false, message:`already present a card for ${customerID} customerId`})

        req.body.cardNumber = randomstring.generate(4)

        const createData = await cardModel.create(req.body)
        return res.status(201).send({status:true, message:createData})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }

}

const getCards = async function(req,res){
    try{
        let fetch = await cardModel.find()
        if(fetch.length==0)return res.status(404).send({status:false, message:"No card exists"})

        return res.status(200).send({status:true, message:fetch})
    }
    catch(err){
        return res.status(500).send({status:false, message:err.message})
    }
}
module.exports = {createCard, getCards}