const user=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id, role) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {
        expiresIn: "24h",
    });
};

const registerUser = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }
};

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({message: "Invalid Credentials"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    }catch(err){
        res.status(500).json({message: "Server error", error: err.message});
    }   
};

module.exports = {registerUSer, loginUser};