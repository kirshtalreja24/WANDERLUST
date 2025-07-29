const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); 



const listingRouter = require("./Router/listing.js");
const reviewRouter = require("./Router/review.js");
const userRouter = require("./Router/user.js");

main()
    .then((res) => {
        console.log("Connected to DB ");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



app.get("/", (req, res) => {
    res.send("Hi, I am root");
});



const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // total ms -> one week
        maxAge: 7 * 24 * 60 * 60 * 1000, // maximum life span 
        httpOnly: true,  // used in security measure to protect against Cross-Site Scripting (XSS) attacks.  &  Only the server can access this cookie (e.g., to track sessions).
    },
};

//use session
app.use(session(sessionOptions));
app.use(flash());



// we need session for passport creation-
app.use(passport.initialize()); // Initializes Passport middleware. 
app.use(passport.session()); // Tells Passport to use session-based authentication.
// working: It reads the session cookie (like connect.sid) on each request. & If a session is valid and has a logged-in user, it attaches the user to req.user.

passport.use(new LocalStrategy(User.authenticate()));  // Tells Passport to use the local strategy (i.e., username & password login) and provides it with the logic to verify credentials using User.authenticate().
// working : passport-local expects a username and password in a POST request.
//       --> User.authenticate() (from passport-local-mongoose) provides the logic to: 1) Find the user 2) check if pass matches 3) return success or failure           


passport.serializeUser(User.serializeUser()); // Defines how Passport should store user data into the session (usually just the user ID).  So that after logging in, Passport knows how to store user info in the session.
// working : When login is successful, serializeUser is called. , It returns a unique identifier (like _id) to store in the session. , This ID is stored in the cookie.
// eg: A user logs in → their _id is stored in the session → cookie is sent to the client.


passport.deserializeUser(User.deserializeUser()); // Defines how to retrieve full user info from the session using the stored user ID.
// Need : On every request, you don’t want to store the entire user object in the cookie. Instead, store a lightweight ID and fetch the user from the DB when needed.
// Working : On every request with a session cookie, Passport: 1) Extracts the user ID from the cookie 2) Calls deserializeUser 3) fetches the full user document 4) Attaches to req.user



// Middleware to create key-value pairs of flash messages in res.locals
// so they can be accessed in views (e.g., EJS templates) 
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser =  req.user;  // req.user directly is inaccessible in ejs files
    next();
})


 
// use the routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/" , userRouter);




app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { status = 500, message = "Some Error Occured" } = err;
    // res.status(status).send(message);
    res.status(status).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});