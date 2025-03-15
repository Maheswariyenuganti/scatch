const userModel=require("../models/userModel.js");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {generateToken}=require("../utils/generateToken.js");
// const product=require("../models/productModel.js");
const productModel = require("../models/productModel.js");
module.exports.registerUser=async function( req,res){
 try{
    
    let{email,password,fullName}=req.body;
    
   let user=await userModel.findOne({email:email})
if(user){
return res.send("User Already Had an Account please Login .. !");
}
else{
    bcrypt.genSalt(10,function (err,salt){
        bcrypt.hash(password,salt,async function (err,hash){
            if(err){
                return res.send(err.message);
            }
            else{
            let user=await userModel.create({
                email,
                password:hash,
                fullName
            });
         let token= generateToken(user);
         res.cookie("token", token);
         res.send("User created Successfully");
            }
        });
    });
//    let user= await userModel.create({
//         email,
//         password,
//         fullName
//     });
   
//    let{email,password,fullName}=req.body;
//    await userModel.create({
//        email,
//        password,
//        fullName
//    });


 }
}
 catch(err){
  res.send(err.message);
 }


}
module.exports.loginUser=async function(req,res){
    let {email,password}=req.body;
    let products=await productModel.find();
 let user=await   userModel.findOne({email:email});
if(!user)return res.send("Email or password Incorect");
bcrypt.compare(password,user.password,function (err,result){
   if(result){
  let token=generateToken(user);
  res.cookie("token", token);
console.log(products);
  res.render("shop",{products})
   }
   else
   {
    res.send("Email or Password Incorrect");
   }
})

}
module.exports.logout=function(req,res){
    res.cookie("token","");
    res.redirect("/");
}




