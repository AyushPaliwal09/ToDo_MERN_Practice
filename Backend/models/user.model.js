import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reqiured:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type: String,
    }
}, {timestamps:true});

export const User = mongoose.model("User", userSchema);
