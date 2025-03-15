const express=require("express");
const app=express();

// const cookieParser = require('cookie-parser');
const cookieParser=require("cookie-parser");
const path=require("path");
const db=require("./config/mongoose-connection.js");
const ownersRouter=require("./routes/ownersRouter.js");
const productsRouter=require("./routes/productsRouter.js");
const usersRouter=require("./routes/usersRouter.js");
const indexRouter=require("./routes/index.js");
const expressSession=require("express-session");
const flash=require("connect-flash");

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
// app.use(expressSession({
//     resave:false,
//     saveUninitialized: false,
//     secret: process.env.EXPRESS_SESSION_SECRET
// })
// );
app.use(expressSession({
  secret: 'Mahi',  // This is your session secret
  resave: false,              // Determines if session is saved on every request
  saveUninitialized: true,    // Forces a session that is uninitialized to be saved
  cookie: { secure: false }   // Set `secure: true` if using HTTPS
}));
// app.use(expressSession({
//     resave: false,
//     saveUninitialized:false,
//     secret:process.env.EXPRESS_SESSION_SECRET,
//   })
// );
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs");
app.use("/",indexRouter);
app.use("/owners", ownersRouter);
app.use("/users",usersRouter);
app.use("/products",productsRouter);

app.listen(3000);
