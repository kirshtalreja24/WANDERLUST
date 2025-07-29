const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");


const userController = require("../controller/user.js");

// signup -> GET (render the form) , POST(put user in db)
router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.signup));


//Login 
router.get("/login", userController.renderLoginForm);

// passport has a functionality , that when we login , the authentication get successful it, restarts the session ie: all the extra things get removed from req.session
router.post("/login", saveRedirectUrl,  // before authentication so that session couldn't get restart
     passport.authenticate("local", { failureRedirect: '/login', failureFlash: true })
    , userController.login
);



// Logout
router.get("/logout", userController.logOut); 

module.exports = router;