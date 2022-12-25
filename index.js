const express = require('express')
const mongoose = require('mongoose')
const route = require('./src/routes/routes')
const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://insh007:Inshad123@firstcluster.p0r04o1.mongodb.net/companyAssignment",{
    useNewUrlParser:true
},mongoose.set('strictQuery', true))
.then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err))


app.use('/',route)

app.use('/*',function(req,res){
    return res.send(400).send("Provided url is wrong")
})


app.listen(3000, ()=>{
    console.log("Express app is running on PORT",3000)
})


