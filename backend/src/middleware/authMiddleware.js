const jwt=require("jsonwebtoken");
const User=require("../models/User");

const protect = async (req, res, next) => {
    try{
        const token=req.headers.cookie?.split("=")[1] || req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Not authorized, no token"});
        }

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        
        const user=await User.findById(decoded.id);
        
        if(!user){
            return res.status(401).json({message: "User not found"});
        }

        req.user={
            id: user._id,
            email: user.email, 
            role: user.role
        };
        
        next();

    } catch (err){
        console.error("JWT Error: ", err.message);
        res.status(401).json({message: "Not authorized - Session expired"});
    }
};

module.exports={protect};