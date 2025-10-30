const express=require("express");

const {
    hrUpdateAttendance,
    getAllAttendance,
    employeeAttendance
} = require("../controllers/attendanceController");
const {protect}  =require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/mark", protect, roleMiddleware(["HR"]), hrUpdateAttendance);
router.get("/view", protect, roleMiddleware(["HR"]), getAllAttendance),
router.get("/my", protect, roleMiddleware(["Employee"]), employeeAttendance);

module.exports = router;

