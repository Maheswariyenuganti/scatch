const express=require("express");
const userModel = require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {registerUser,loginUser,logout}=require("../controllers/authController.js");
const router=express.Router();
const {generateToken}=require("../utils/generateToken.js");
router.get("/",function(req,res){
    res.send("hey I ti users Router");

});
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",logout);

module.exports=router;






