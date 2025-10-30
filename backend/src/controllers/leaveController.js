const Leave = require("../models/Leave");

const applyLeave = async (req, res) => {
    try{
        const {fromDate, toDate, reason} = req.body;

        if(!fromDate || !toDate || !reason){
            return res.status(400).json({message: "All fields are required"});
        }

        const leave = await Leave.create({
            user: req.user._id,
            fromDate,
            toDate,
            reason
        });

        res.status(201).json({message: "Leave applied successfully", leave});
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

const getMyLeaves = async (req, res) => {
    try{
        const leaves = await Leave.find({user: req.user._id}).sort({createdAt: -1});
        res.json(leaves);
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

const getAllLeaves = async (req, res) => {
    try{
        const leaves = await Leave.find()
        .populate("user", "name email role")
        .sort({createdAt: -1});

        res.json(leaves);
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

const updateLeaveStatus = async (req, res) => {
    try{
        const {leaveId} = req.params;
        const {status, remarks} = req.body;

        const leave = await Leave.findById(leaveId);
        
        if(!leave){
            return res.status(404).json({message: "Leave not found"});
        } 

        leave.status = status;
        leave.remarks = remarks || "";
        await leave.save();

        res.json({message: `Leave ${status.toLowerCase()} successfully`, leave});
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

module.exports = {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus
};
