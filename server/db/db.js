import mongoose from "mongoose";



export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connected");
    }
    catch(e){
        console.log("db not connect" , e);
    }
    
}

