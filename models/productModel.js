// const mongoose = require('mongoose');

const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/scatch");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: Buffer,  // Use String if storing image URLs
    bgcolor: String,
    panelcolor: String,
    textcolor: String,
    discount: Number
});

module.exports = mongoose.model('product', productSchema);



