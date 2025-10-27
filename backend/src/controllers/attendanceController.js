const Attendance = require("../models/Attendance");
const User = require("../models/User");
const Task = require("../models/Task");

//1.update the attendance for employee by (Hr)
//2.can view all employee attendance (Hr)
//3.employee can view their attendance (employee)

const hrUpdateAttendance=async (req, res)=>{
    try {
        const {userId}=req.body;
        const {status}=req.body;

        const user = await Attendance.findById(userId);
        if(!user){
            return res.status(404).json({message:"User Not Found",err:error.message});
        }
        user.status=status;
        await user.save();

        res.json({message:"Attendance status updated"},user);
    } catch (err) {
        res.status(500).json({message:"server error",error:err.message});
    }
};

const hrViewAttendance=async (req, res) => {
    try {
        const user=await Attendance.find()
        .populate("date","name id status")
        .sort({date: -1})
        res.json(user);
        res.status(404).json({message:"server error",error:err.message});
    } catch (err) {
        res.status(500).json({message:"server error",error:err.message});
    }    
};

const employeeAttendance = async (req, res) => {
    try {
        const {status, date, id, name, inTime, outTime}=req.body;
        const user=await Attendance.find(
            name,
            id,
            status,
            date,
            inTime,
            outTime,
        );
        res.json(user);
        res.status(404).json({message:"Employee Attendance Not found",error:err.message});
    } catch (err) {
        res.status(500).json({message:"server error",error:err.message});
    }

};

module.exports={
    hrUpdateAttendance,
    hrViewAttendance,
    employeeAttendance
};