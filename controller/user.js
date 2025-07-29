const User = require("../models/user.js");
const passport = require("passport");   


module.exports.renderSignupForm = (req, res) => {
    res.render("./users/signup.ejs");
};

module.exports.signup = async (req, res) => {
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

};


module.exports.renderLoginForm = (req, res) => {
    res.render("./users/login.ejs");
};

module.exports.login = async (req, res) => {
        req.flash("success", "Welcome to wanderlust");
        // res.redirect(req.session.redirectUrl); // this will be undefined because of passports properties -- so to work it we can use it in res.locals()
        let redirectUrl = res.locals.redirectUrl || "/listings";   // because if we are at /listings and we are logging in , then isLoggedIn middleware won't get triggered and value from session to locals won't be put so directly to /listings
        res.redirect(redirectUrl); 
};

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {   // function takes a call back , to do next what after logging out
        if (err) {
            return next(err);
        }
        else {
            req.flash("success", "you are logged out!");
            res.redirect("/listings");
        }
    })
};