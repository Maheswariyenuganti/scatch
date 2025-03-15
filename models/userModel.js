const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/scatch");
const userSchema=mongoose.Schema({
    fullName: String,
    email : String,
    password: String,
    cart :[ {
type: mongoose.Schema.Types.ObjectId,
ref : "product"
    }],
    // isadmin: Boolean,
    orders: {
type: Array,
default: []
    },
    contact : Number,
    picture :String
});
module.exports=mongoose.model("user",userSchema);