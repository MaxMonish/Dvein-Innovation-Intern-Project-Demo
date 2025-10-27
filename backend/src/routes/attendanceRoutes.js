const express=require("express");

const {
    hrUpdateAttendance,
    hrViewAttendance,
    employeeAttendance
}=require("../controllers/attendanceController");

const {protect}=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");

const router=express.Router();

router.post("/update",protect,roleMiddleware(["HR"]),hrUpdateAttendance);
router.get("/view",protect,roleMiddleware(["HR"]),hrViewAttendance),

router.get("/employee",protect,roleMiddleware(["Employee"]),employeeAttendance);

module.exports=router;

