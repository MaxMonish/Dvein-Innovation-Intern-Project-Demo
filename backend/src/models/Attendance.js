const mongoose = require("mongoose");
const User = require("./User");
const Task = require("./Task");

const attendanceSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
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
        inTime:{ type: String },
        outTime:{ type: String }
    },
    {timestamps: true}
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);