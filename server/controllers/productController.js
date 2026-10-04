import { json } from "express";
import Product from "../models/product.js";




export const prouctDetails = async (req, res) => {


    try {

         const { imageUrl,  product_brand, product_name, product_descripition, product_qunatity, product_price, rating } = req.body;


        if ( !product_brand || !product_name || !product_descripition || !product_qunatity || !product_price) {
            return res.status(400).json({
                message: "please fill all requried product details"
            })
        }


        const product = await Product.create({
            imageUrl,
            product_brand,
            product_name,
            product_descripition,
            product_qunatity,
            product_price,
            rating
        });


        res.status(201).json({
            message: "Product detail upload",
            product
        });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({
            message: "serveer errrr"
        })
    }

} 


export const getProduct = async (req,res)=>{

    try{
        
        const product = await Product.find()

        if (product.length === 0) {
            return res.status(404).json({
                message: "product not found"
            })
        }


        if(!product){
            return res.status(400).json({
                message:"product not found"
            })
        }

        res.status(200).json({
            message : "product featch successful",
            product
        })

    }catch(e){
        console.log(e);
        return res.status(400).json({
            message: "server err"
        })
        
    }

}


// export const updateProduct = async (req,res)=>{
//     try{
//         const {product_name,product_descripition,product_qunatity, product_price}  = req.body
//         const id = req.params.id;
        
//     }
// }







// const newProduct = await Product.create(req.body)

// res.status(200).json({
//     message:"product upload successful",
//     product:newProduct
// })


// const {product_name,product_brand} = req.body

        // if(!product_brand || !product_name){
        //     return res.status(400)({
        //         message:"product not found"
        //     })
        // }