const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_admin:{
        type:Number,
        required:true,
        default:0
    },
    is_block:{
        type:Boolean,
        default:false
    },
    is_verified:{
        type:Boolean,
        default:false,
    }
    
        
    
})

module.exports=mongoose.model('User',userSchema)