import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone_no:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        default:null
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    otpExpiry:{
        type:Date,
        default:null
    }
    


},{timestamps:true})



export default mongoose.model("User" , userSchema)