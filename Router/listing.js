const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");

const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


//Index Route
router.get("/", wrapAsync(async (req, res, next) => {
    const all_listings = await Listing.find({});
    res.render("listings/index.ejs", { all_listings });
}));

//New  Route
router.get("/new", isLoggedIn, (req, res) => {
    // console.log(req.user); // contains the whole information about user
    res.render("listings/new.ejs");
})

// Show Route
router.get("/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;                            // we want all reviews , and we also want authors from reviews too 
    const list = await Listing.findById(req.params.id)
    .populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    })
    .populate("owner");

    if (!list) {
        req.flash("error", "Listing you requested for doesnot exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { list });
}));


// Create Route
router.post("/", validateListing, isLoggedIn, wrapAsync(async (req, res, next) => {
    const newList = new Listing(req.body.listing);
    // console.log(req.user);
    newList.owner = req.user._id;
    await newList.save()
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash("error", "Listing you requested for doesnot exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { list });
}));


//Update Route
router.put("/:id", isLoggedIn, isOwner, validateListing,  wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}));


//Destroy Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;    