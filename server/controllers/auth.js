import User from "../models/User.js";

export const register = async(req,res) => {
    try{
        const{userName,email,password} = req.body;

        const newUser = new User({
            userName , email, password
        });

        const savedUser = await newUser.save();
        if(savedUser){
            res.json("new-user");
            return;
        } 
        if(!savedUser){
            res.json("old-user");
            return;
        }
        
        res.json(savedUser);
    }
    catch(error){
        res.send({error:error.message});
    }
}

export const login = async(req,res) => {
    try{
        const{email,password} = req.body;
        const user = await User.findOne({email : email});
        if(!user) return res.json({message:"user does not exist"});

        const isMatch = (user.password === password);

        if(isMatch){
            res.json("old-user");
            return;
        } 
        if(!isMatch){
            res.json("new-user");
            return;
        } 

        res.json({user});
    }
    catch(error){
        res.json({error:error.message});
    }
}