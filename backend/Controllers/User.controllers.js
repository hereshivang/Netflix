import {User} from "../Models/User.model.js";
import bcryptjs from "bcryptjs";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({
    path: "../.env"
})

// Register Controller
export const Register = async(req,res) => {
    try {
        const {fullname, email,password} = req.body;
        // Check for form validation
        if(!fullname || !email || !password){
            return res.status(401).json({
                message : "Invalid Data",
                success: false
            })
        };

        // Check for Existing User
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message : "Already Registered!",
                success : false
            })
        };

        // Password Hashing
        const hashedPassword = await bcryptjs.hash(password,10);

        // Create new User and Save it
        await User.create({
            fullname,
            email,
            password : hashedPassword
        });
        return res.status(201).json({
            message:"Register Successful!",
            success : true
        })

    } catch (error) {
        console.log(`Register Error : ${error}`)
    }
};

// Login Controller
export const Login = async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                message :"Invalid Data",
                success : false
            })
        }

        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                message: "User Existed",
                success : false
            })
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Wrong Credentials",
                success : false
            })
        }

        const tokendata = {
            id: user._id
        }

        const token = await jwt.sign(tokendata, process.env.JWT_SECRET);
        return res.status(201).cookie("token", token).json({
            message:`Welcome Back ${user.fullname}`,
            user,
            success : true
        })


    } catch (error) {
        console.log(`Login Error : ${error}`)
    }
}

// Logout Controllers
export const Logout = async(req,res) => {
    try {
        return res.status(201).cookie("token", "", {expiresIn:new Date(Date.now)}).json({
            message:`User Logged Out`,
            success : true
        })
    } catch (error) {
        console.log(`Logout Error : ${error}`);
    }
}