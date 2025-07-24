const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust'
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const Review = require("./models/review.js");   

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

const validateListing = (req,res,next)=>{
   let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 ,errMsg);
    }
    else{
        next();
    }
}

//Index Route
app.get("/listings",wrapAsync(async (req, res , nex) => {
    const all_listings = await Listing.find({});
    res.render("listings/index.ejs", { all_listings });
}));

//New  Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})

// Show Route
app.get("/listings/:id", wrapAsync(async (req, res , nex) => {
    let { id } = req.params;
    const list = await Listing.findById(id);
    res.render("listings/show.ejs", { list });
}));

// Create Route
app.post("/listings", validateListing, wrapAsync(async (req, res , next) => {
    // let listing = req.body.listing;
    // if(!req.body.listing){
    //    throw new ExpressError(400 , "Send valid data for listing");
    // }
   
    const newList = new Listing(req.body.listing);
    await newList.save() 
    res.redirect("/listings");
}));

//Edit Route
app.get("/listings/:id/edit" , wrapAsync(async (req,res , nex) => {
    let { id } = req.params;
    const list = await Listing.findById(id);
    res.render("listings/edit.ejs" , {list});
}));

//Update Route
app.put("/listings/:id" , validateListing ,   wrapAsync(async (req,res , nex)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id , {...req.body.listing} , {runValidators:true}); 
     res.redirect(`/listings/${id}`)
}));

//Destroy Route
app.delete("/listings/:id" , wrapAsync( async (req,res , nex) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    
    res.redirect("/listings");
}));

// Reviews
// Creation Route
app.post("/listings/:id/reviews" , async (req,res) => {
    // first get the listing for which we want to add reviews
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

   await newReview.save(); 
   await listing.save(); 

   res.redirect(`/listings/${id}`);
});


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