const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    image:{type:String,required:true},
      otp:{
         type:String,
          require:true
    },
    otpExpiry:{
        type:Date
    },
})
const Usermodel=mongoose.model('user',userSchema)
module.exports=Usermodel