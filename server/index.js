import express from 'express'
import { connectDb } from './db/db.js'
import dns from 'node:dns/promises'
import dotenv from 'dotenv'
import { Story} from './models/story.js'
import router from './Routes/userRoutes.js'
import productRouter from './Routes/productRoutes.js'
import storyRouter from './Routes/storyRoutes.js'
import { upload } from './middleware/imageUpload.js'




dns.setServers(['8.8.8.8','0.0.0.0'])
dotenv.config()


const app=express()
const port = process.env.PORT || 6000    


app.use(express.json())
connectDb()

app.use('/upload' , express.static("upload"))




app.use('/api/v1/auth',router)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/story',storyRouter)


app.listen(port,()=>{
    console.log(`Server is running on port no : ${port}`);

    
})