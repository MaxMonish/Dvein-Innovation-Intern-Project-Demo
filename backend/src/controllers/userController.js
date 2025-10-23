const User = require("../models/User");

const getAllUsers = async (req, res) => {
    const users = await User.find({}, "name email role");
    res.json(users);
};

module.exports = {getAllUsers};