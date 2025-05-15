const express = require("express");
const { register, login, privateController } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");



const router = express.Router()

router.post("/register" , register)
router.post("/login" , login)
router.post("/private", protect, privateController )




module.exports  = router