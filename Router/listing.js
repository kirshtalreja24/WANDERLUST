const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");


// server side validation for listing
const validateListing = (req,res,next)=>{
   let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400 ,errMsg);
    }
    else{
        next();
    }
};


//Index Route
router.get("/", wrapAsync(async (req, res, nex) => {
    const all_listings = await Listing.find({});
    res.render("listings/index.ejs", { all_listings });
}));

//New  Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
})

// Show Route
router.get("/:id", wrapAsync(async (req, res, nex) => {
    let { id } = req.params;
    const list = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { list });
}));

// Create Route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    // let listing = req.body.listing;
    // if(!req.body.listing){
    //    throw new ExpressError(400 , "Send valid data for listing");
    // }

    const newList = new Listing(req.body.listing);
    await newList.save()
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit", wrapAsync(async (req, res, nex) => {
    let { id } = req.params;
    const list = await Listing.findById(id);
    res.render("listings/edit.ejs", { list });
}));

//Update Route
router.put("/:id", validateListing, wrapAsync(async (req, res, nex) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    res.redirect(`/listings/${id}`)
}));

//Destroy Route
router.delete("/:id", wrapAsync(async (req, res, nex) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
}));

module.exports = router;    