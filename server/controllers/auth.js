import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import BlacklistToken from '../models/BlackListToken.js';

dotenv.config();

const secret = process.env.JWT_SECRET;

export const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }

        // Check if the token is blacklisted
        const blacklistedToken = await BlacklistToken.findOne({ token });
        if (blacklistedToken) {
            return res.status(401).json({ error: 'Token is blacklisted. Please log in again.' });
        }

        // Verify the token
        const decoded = jwt.verify(token, secret);
        if (!decoded) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        console.log('Authenticated user:', decoded); // Debugging line
        req.user = decoded;
        next();
    } catch (e) {
        console.error('Authentication error:', e);
        res.status(401).json({ error: 'Authentication error. Please log in again.' });
    }
};


export const register = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        console.log("Received registration request:", req.body);

        // Validate input
        if (!email || !userName || !password) {
            console.log("Missing required fields");
            return res.status(400).json({ status: "error", error: "Email, username, and password are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists with this email");
            return res.status(400).json({ status: "old-user", error: "User already exists with this email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed");

        // Create new user
        const newUser = new User({ email, userName, password: hashedPassword });

        // Save the user
        await newUser.save();
        console.log("New user saved:", newUser);

        // Generate JWT token
        const token = jwt.sign({ _id: newUser._id }, secret, { expiresIn: '30d' });

        // Update user's tokens array
        newUser.tokens = newUser.tokens.concat({ token });
        await newUser.save();
        console.log("Token added to user:", newUser);

        res.status(201).json({ status: "new-user", token });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ status: "error", error: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '30d' });

        // Update user's tokens array
        user.tokens = user.tokens.concat({ token });
        await user.save();

        console.log("User logged in:", user);

        res.status(200).json({ token, userName: user.userName, status: "old-user" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


//         const{userId, userName,email,password} = req.body;
        
//         const newUser = new User({
//             userId,userName , email, password
//         });

//         const savedUser = await newUser.save();
//         if(savedUser){
//             res.json({ status: "new-user", userId: savedUser._id, name:savedUser.userName }); //UTILIZED IN HOME.JSX IN THIS LINE:const userId = localStorage.getItem('userId');const name = localStorage.getItem('name');
//             return;
//         } 
//         if(!savedUser){
//             res.json("old-user");
//             return;
//         }
        
//         res.json(savedUser);
//     }
//     catch(error){
//         res.send({error:error.message});
//     }
// }

// export const login = async(req,res) => {
//     try{
//         const{email,password} = req.body;
//         const user = await User.findOne({email : email});
//         if(!user) return res.json({message:"user does not exist"});

//         const isMatch = (user.password === password);

//         if (isMatch) {
//             res.json({ status: "old-user", userId: user._id, name:user.userName }); //UTILIZED IN HOME.JSX IN THIS LINE:const userId = localStorage.getItem('userId');const name = localStorage.getItem('name');
//             return;
//         }

//         if(!isMatch){
//             res.json("new-user"); 
//             return;
//         } 

//         res.json({user});
//     }
//     catch(error){
//         res.json({error:error.message});
//     }
// }