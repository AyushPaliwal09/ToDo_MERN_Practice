import mongoose from "mongoose"

export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.mongoDB);
        console.log("Connected to DB successfully");
    }
    catch(error){
        console.log("Error in mongoDB connection ",error);
    }
}