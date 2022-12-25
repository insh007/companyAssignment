const express = require('express') 
const router = express.Router()
const {createCustomer,getCustomers, deleteCustomer} = require('../controllers/customerController')
const {createCard, getCards} = require('../controllers/cardController')

router.post('/customerRegister', createCustomer)
router.get('/fetchCustomers', getCustomers)
router.delete('/customer/:customerId', deleteCustomer)


router.post('/cardCreate', createCard)
router.get('/fetchCards', getCards)

module.exports = router