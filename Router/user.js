const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

// signup -> GET (render the form) , POST(put user in db)
router.get("/signup", (req, res) => {
    res.render("./users/signup.ejs");
});

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {  // we want if the user is signed up , then it would automatically be logged in 
            if (err) {                          // when the login operation completes, user will be assigned to req.user
                return next(err);
            }
            req.flash("success", "User registered successfully");
            res.redirect("/listings");
        })
    } catch (e) {
        console.log(e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}));


//Login 
router.get("/login", (req, res) => {
    res.render("./users/login.ejs");
});  // passport has a functionality , that when we login , the authentication get successful it, restarts the session ie: all the extra things get removed from req.session
router.post("/login", saveRedirectUrl,  // before authentication so that session couldn't get restart
     passport.authenticate("local", { failureRedirect: '/login', failureFlash: true })
    , async (req, res) => {
        req.flash("success", "Welcome to wanderlust");
        // res.redirect(req.session.redirectUrl); // this will be undefined because of passports properties -- so to work it we can use it in res.locals()
        let redirectUrl = res.locals.redirectUrl || "/listings";   // because if we are at /listings and we are logging in , then isLoggedIn middleware won't get triggered and value from session to locals won't be put so directly to /listings
        res.redirect(redirectUrl); 
    }
);



// Logout
router.get("/logout", (req, res, next) => {
    req.logout((err) => {   // function takes a call back , to do next what after logging out
        if (err) {
            return next(err);
        }
        else {
            req.flash("success", "you are logged out!");
            res.redirect("/listings");
        }
    })
})

module.exports = router;