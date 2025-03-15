const express=require("express");
// const productModel=require("../models/productModel.js");
const router=express.Router();

const isLoggedIn=require("../middlewears/isLoggedIn.js");
// app.set("view engine","ejs");
const productModel=require("../models/productModel.js");
const session=require("session");
const userModel = require("../models/userModel.js");
router.get("/",function (req,res){
    let error=req.flash("error");
    res.render("index", {error});
});

//     res.render("shop");
// });
// Import your Product model
// router.get("/shop",isLoggedIn, function (req,res){
//     res.render("shop");
// });
// router.get('/shop',isLoggedIn, async (req, res) => {
 
//    let products=  await productModel.find();

//         res.render("shop",{products});
// }
// );
router.get("/shop", isLoggedIn, async function (req, res) {
    try {
      let products = await productModel.find();
  
      if (products.length > 0) {
        console.log("ok");
      } else {
        console.log("Not Ok");
      }
 
      res.render("shop", { products});
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Internal Server Error");
    }
  });

router.get("/cart",isLoggedIn,async function(req,res){
  let user=await userModel.findOne({email : req.user.email}).populate("cart");
// console.log(user.cart);
const final=Number((user.cart[0].price)+20)-Number(user.cart[0].discount);




  // let products=await productModel.find();
  // let success=req.flash("success");
  res.render("cart",{user, final});
});




  
router.get("/addtocart/:productid", isLoggedIn,async function(req,res){
let user=await userModel.findOne({email: req.user.email});
user.cart.push(req.params.productid);
await user.save();
req.flash("success", "Added to Cart");
res.redirect("/shop");
});
router.get("/admin", async (req,res)=>{
    res.render("cartproduct");
})
router.get("/logout",isLoggedIn,function (req,res){
    res.render("shop");
})

module.exports=router;





