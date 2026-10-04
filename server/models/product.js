import mongoose from "mongoose";

const productSchema = new mongoose.Schema({


    imageUrl:{
        type:String,
        default:true
    },
    product_brand:{
        type:String,
        required: true
    },
    product_name:{
        type: String,
        required: true
    },
    product_descripition:{
        type: String,
        required:true
    },
    product_qunatity:{
        type:Number,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
    }

 
})

export default mongoose.model("Product" , productSchema)