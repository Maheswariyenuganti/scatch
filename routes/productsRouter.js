const express=require("express");
const router=express.Router();
// const upload=require("../config/multer-config.js");
const upload=require("../config/multer-config.js");
// const productModel=require("../models/productModel.js");
const productModel=require("../models/productModel.js");
router.get("/delete",async function(req,res){
    const product=await productModel.deleteMany({});
    res.send("delted products seucces");
})

router.post("/create",upload.single("image"),async function(req,res){
    
try{
    let {image,name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
    let product=await productModel.create({
        image:req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    textcolor,
    panelcolor
    });
// console.log(product);
    req.flash("success","Product created successfully");
    res.redirect("/owners/admin");
}
catch(err){
    res.send(err.message);
}
});

module.exports=router;







