const Task = require("../models/Task");
const User = require("../models/User");
const Attendance = require("../models/Attendance");

const createTask = async (req, res) => {
    try{
        const { title, description, assignedTo, dueDate } = req.body;

        const employee = await User.findById(assignedTo);
        if(!employee){
            return res.status(404).json({message: "Employee not found"});
        }

        const task = await Task.Create({
            title,
            description, 
            assignedTo,
            createdBy: req.user._id,
            dueDate
        });

        res.status(201).json({message: "Task created successfully", task});
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

const getMyTasks = async (req, res) => {
    try{
        const tasks = await Task.find({assignedTo: req.user._id}).sort({createdAt: -1});
        res.json(tasks);
    } catch(err) {
        res.status(500).json({messsage: "Server error", error: err.message});
    }
};

const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find()
        .populate("assignedTo", "name email role")
        .populate("createdBy", "name email role")
        .sort({createdAt: -1});

        res.json(tasks);
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

const updateTaskStatus = async (req, res) => {
    try{
        const {taskId} = req.params;
        const {status} = req.body;

        const task = await Task.findOne({_id: taskId, assignedTo: req.user._id});
        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        task.status = status;
        await task.save();

        res.json({message: "Task status updated", task});
    } catch(err) {
        res.status(500).json({message: "Server error", error: err.message});
    }
};

module.exports = {
    createTask,
    getMyTasks,
    getAllTasks,
    updateTaskStatus   
};