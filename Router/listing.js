const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require("../middleware.js");

// server side validation for listing
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};


//Index Route
router.get("/", wrapAsync(async (req, res, nex) => {
    const all_listings = await Listing.find({});
    res.render("listings/index.ejs", { all_listings });
}));

//New  Route
router.get("/new", isLoggedIn , (req, res) => {
    // console.log(req.user); // contains the whole information about user
    res.render("listings/new.ejs");
})

// Show Route
router.get("/:id", wrapAsync(async (req, res, nex) => {
    let { id } = req.params;
    const list = await Listing.findById(id).populate("reviews").populate("owner");
    if (!list) {
        req.flash("error", "Listing you requested for doesnot exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { list });
}));

// Create Route
router.post("/", validateListing, isLoggedIn , wrapAsync(async (req, res, next) => {
    const newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    await newList.save()
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));

//Edit Route
router.get("/:id/edit", isLoggedIn , wrapAsync(async (req, res, nex) => {
    let { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash("error", "Listing you requested for doesnot exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { list });
}));

//Update Route
router.put("/:id", validateListing,  isLoggedIn , wrapAsync(async (req, res, nex) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`)
}));

//Destroy Route
router.delete("/:id",  isLoggedIn , wrapAsync(async (req, res, nex) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));

module.exports = router;    