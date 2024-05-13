import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: { 
        type: String, 
        required: true,
        trim : true
    },
    email:{
        type : String ,
        required : true,
        trim : true
    },
    password:{
        type : String,
        required : true
    }
},
{timestamps:true});

export const User = new mongoose.model("User", userSchema);