const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");

// signup -> GET (render the form) , POST(put user in db)
router.get("/signup" , (req,res)=>{
    res.render("./users/signup.ejs");
});

router.post("/signup" , wrapAsync(async(req,res) => {
    try{
        let {username , email , password} = req.body;
        const newUser = new User({email , username});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);
        req.flash("success" , "User registered successfully");
        res.redirect("/listings");
    } catch(e){
         console.log(e);
         req.flash("error" , e.message);
         res.redirect("/signup");
    }
   
}));


//Login 
router.get("/login" , (req,res) => {
    res.render("./users/login.ejs");
});
router.post("/login" , passport.authenticate("local" , {failureRedirect:'/login' , failureFlash:true}) 
 , async (req,res) => {
    req.flash( "success" , "Welcome to wanderlust");
    res.redirect("/listings");
 }
);


// Logout
router.get("/logout" , (req,res , next) => {
    req.logout((err) => {   // function takes a call back , to do next what after logging out
         if(err){
            next(err);
         }
         else{
            req.flash("you are logged out!");
         }
    })
})

module.exports = router;