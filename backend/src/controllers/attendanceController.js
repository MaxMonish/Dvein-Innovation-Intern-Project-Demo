const Attendance = require("../models/Attendance");
const User = require("../models/User");
const Task = require("../models/Task");

//1.update the attendance for employee by (Hr)
//2.can view all employee attendance (Hr)
//3.employee can view their attendance (employee)

const hrUpdateAttendance = async (req, res) => {
    try { 
        const {employeeId, status} = req.body;

        if(!employeeId || !status){
            return res.status(400).json({message: "Employee ID and status required"});
        }

        const employee = await User.findById(employeeId);
        if(!employeeId){
            return res.status(404).json({message:"Employee Not Found"});
        }

        const today = new Date().setHours(0,0,0,0);
        const existingRecord = await Attendance.findOne({
            user: employeeId,
            date: {$gte: today}
        });

        if(existingRecord){
            return res.status(400).json({message: "Attendance already marked for this employee today"});
        }

        const record = await Attendance.create({
            user: employeeId,
            status,
            date: new Date()
        });
        
        res.status(201).json({message: `Attendance marked as '${status}' for ${employee.name}`, record});
    } catch(err) {
        res.status(500).json({message: "server error", error: err.message});
    }
};

const getAllAttendance = async (req, res) => {
    try {
        const record = await Attendance.find()
        .populate("user","name email role")
        .sort({date: -1})

        res.json(record);
    } catch(err) {
        res.status(500).json({message:"server error",error:err.message});
    }    
};

const employeeAttendance = async (req, res) => {
    try {

        const record = await Attendance.find({user: req.user._id}).sort({date: -1});

        res.json(record);
    } catch(err) {
        res.status(500).json({message: "server error", error: err.message});
    }
};

module.exports={
    hrUpdateAttendance,
    getAllAttendance,
    employeeAttendance
};