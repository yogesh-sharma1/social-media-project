import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js"

/* Register User */
export const register = async (req, res) => {
    try{
        const {
            firstname,
            lastname,
            email,
            password,
            friends,
            occupation,
            picturePath,
            location
        } = req.body;
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        let viewedProfile = Math.floor(Math.random()*1000);
        let impressions = Math.floor(Math.random()*viewedProfile);

        const newUser = new User({
            firstname,
            lastname,
            email,
            friends,
            password: hashedPassword,
            occupation,
            picturePath,
            location,
            viewedProfile, 
            impressions
        });

        let savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
    catch(err){
        res.status()
        console.log(err);
    }
}


/* Logging In */
export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({ email: email });

        if(!user){
            return res.status(400).json({msg: "user does not exist!"});
        }
        
        const pswrdMatch = await bcrypt.compare(password, user.password);
        if(!pswrdMatch){
            return res.status(400).json({msg: "user does not exist!"}); 
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);        

        delete user.password;
        res.status(200).json({ token, user})
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}
