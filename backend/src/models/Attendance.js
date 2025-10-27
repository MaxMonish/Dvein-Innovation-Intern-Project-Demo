const mongoose = require("mongoose");
const User = require("./User");
const Task = require("./Task");

const attendanceSchema = mongoose.Schema(
    {
        name:{
            type: mongoose.Schema.Types.ObjectIDd,
            ref: "User",
            required: true
        },
        date:{
            type: Date,
            required: true, 
            default: Date.now
        },
        status:{
            type: String,
            enum:["Present", "Absent", "Leave"],
            required:true
        },
        inTime:{
            type: String
        },
        outTime:{
            type: String
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("Attendance", attendanceSchema);