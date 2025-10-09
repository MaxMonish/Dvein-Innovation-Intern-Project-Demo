const mongoose=require("mongoose");
const User = require("./User");

const attendenceSchema= mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
            trim: true
        },
        id:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            unique:true,
            ref:"User"
        },
        date:{
            type:Number,
            required: true
        },
        status:{
            type:String,
            enum:["present","absent"],
            required:true
        },
        inTime:{
            type:String,   
            required:true,
            timestamps: true
        },
        outTime:{
            type: String,
            required: true,
            timestamps:true
        },
    },
);


module.exports=mongoose.model(attendenceSchema);