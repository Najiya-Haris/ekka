const express=require("express")
const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/Naji-Shoppy");
const morgan = require('morgan')
const nocache = require('nocache')

const app=express()
const path=require('path')

app.use(express.static(path.join(__dirname,'public')))

app.use(nocache());

app.use(morgan('tiny'))


const userRoute=require('./routes/userRoute')
app.use('/',userRoute)

const adminRoute=require('./routes/adminRoute')
app.use('/admin',adminRoute)

app.listen(5000,function(){
    console.log("Server running 5000");
})