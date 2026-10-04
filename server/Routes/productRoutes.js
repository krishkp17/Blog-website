import express from 'express'
import { getProduct, prouctDetails } from '../controllers/productController.js'
import {upload} from '../middleware/imageUpload.js';


const productRouter = express.Router();


productRouter.post("/create", upload.single("imageUrl") ,  prouctDetails);
productRouter.get("/productFetch" , getProduct);


export default productRouter;
