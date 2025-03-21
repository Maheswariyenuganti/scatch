const express=require("express");
const router=express.Router();
const ownerModel=require("../models/ownerModel.js");
router.post("/create", async function(req,res){
    let owners=await ownerModel.find();
    if(owners.length>0){
        return res.status(500).send("You dont have permission to create a new owner");
    }
 
    let {fullname,email,password}=req.body;
    let createdOwner=await ownerModel.create({
        fullname,email,password
    });
res.status(201).send(createdOwner);
    

});
router.get("/admin",function (req,res){
   let success=req.flash("success");
    res.render("cartproduct",{success});

})
module.exports=router;
