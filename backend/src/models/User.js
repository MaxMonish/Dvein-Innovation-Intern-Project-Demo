const mongoose=require("mongoose");

const userSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            trim: true
        },
        password: {
            type: [String, Number],
            required: [true, "Please enter your password"]
        },
        role: {
            role: String,
            enum: ["HR", "Employee"],
            required: true,
            default: "Employee"
        },
    },
    {
        timestamps: true
    }
);

module.exports=mongoose.model("User",userSchema);