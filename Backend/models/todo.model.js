import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
     text:{
        type:String,
        required:true
     },
        completed:{
        type:Boolean,
        default:false
     },
     user:
     {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User", // Reference to the User model
         required: true
     }
    },
 {timestamps:true}
);

export const Todo = mongoose.model("Todo",todoSchema);
