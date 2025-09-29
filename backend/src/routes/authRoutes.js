const express=require("express");
const {registerUser, loginUser}=require("../controllers/authController");
const {protect}=require("../middleware/authMiddleware");
const roleMiddleware=require("../middleware/roleMiddleware");

const router=express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/me", protect, (req, res) => {
    res.json({message: "User Profile", user: req.user});
});

router.get("/hr-only", protect, roleMiddleware(["HR"]), (req, res) => {
    res.json({message: "Welcome HR, only you can access this"});
});

module.exports=router;