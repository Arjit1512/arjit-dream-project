import User from "../models/User.js";

export const register = async(req,res) => {
    try{
        const{userId, userName,email,password} = req.body;
        
        const newUser = new User({
            userId,userName , email, password
        });

        const savedUser = await newUser.save();
        if(savedUser){
            res.json({ status: "new-user", userId: savedUser._id, name:savedUser.userName }); //UTILIZED IN HOME.JSX IN THIS LINE:const userId = localStorage.getItem('userId');const name = localStorage.getItem('name');
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

        if (isMatch) {
            res.json({ status: "old-user", userId: user._id, name:user.userName }); //UTILIZED IN HOME.JSX IN THIS LINE:const userId = localStorage.getItem('userId');const name = localStorage.getItem('name');
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