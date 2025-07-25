const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listings = require("./Router/listing.js");
const reviews = require("./Router/review.js");

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

app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});



// use the routers
app.use("/listings" , listings);
app.use("/listings/:id/reviews" , reviews);




app.use((req,res,next) => {
    next(new ExpressError(404 , "Page Not Found"));
});

app.use((err , req , res , next) => {
    let {status = 500 , message = "Some Error Occured"} = err;
    // res.status(status).send(message);
    res.status(status).render("error.ejs" , {message});    
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});