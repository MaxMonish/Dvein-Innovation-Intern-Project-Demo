const express = require("express");
const {getAllUsers} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", protect, roleMiddleware(["HR"]), getAllUsers);

module.exports = router;