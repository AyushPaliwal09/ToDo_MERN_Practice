import e from "express";
import { generateTokenAndSaveInCookie } from "../jwt/auth.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";


export const UserSignup= async (req,res) =>{
       try {
                const { username, password, email } = req.body

                if (!username || !password || !email) {
                        return res.json({ message: "Please fill all the required fields" })
                }
                const trimEmail = email.toLowerCase().trim()
                const user = await User.findOne({ email: trimEmail });
                
                // !console.log(user._id);
                if (user) {
                        return res.json({ message: "User exist already" })
                }
              
             

                const hashedPassword = await bcrypt.hash(password, 10)
                const newUser = await User.create({ username, password: hashedPassword, email: trimEmail })
                
                
                if (newUser) {
                        const token = await generateTokenAndSaveInCookie(newUser._id, res)
                        res.status(200).json({ message: "User created Successfully", data: newUser, token })
                        console.log("User created Successfully");

                }


        } catch (error) {
                res.json({ message: "Error in signupController", error: error.message })
                console.log("Error in signupController", error.message);
        }
}

export const UserLogin= async (req,res) =>{
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Email and password are required"});
        }
        const trimEmail = email.toLowerCase().trim();
        const user = await User.findOne({ email: trimEmail });
        if(!user){
            return res.status(401).json({message: "No user found with this email address"});
        }
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({message: "Invalid email or password"});
        }
        const token =  await generateTokenAndSaveInCookie(user._id, res);
        res.status(200).json({message: "User logged in successfully", data: user, token});

    }catch(error)
    {
        console.log("Error in UserLogin controller", error);
        res.status(500).json({ message: error.message });
    }
    
}

export const UserLogout= async (req,res) =>{
    try{
        res.clearCookie("jwt",{
            // httpOnly: true,
            // secure: false,
            // sameSite: "lax",
            path: "/",
            // expires: new Date(0),
        })
        res.status(200).json({message: "Logged out successfully"});

    }catch(error)
    {
        console.log("Error in UserLogout controller", error);
        res.status(500).json({ message: error.message });
    }
}