const express = require("express");
const router = express.Router({ mergeParams: true });  // mergeParams:true -> will basically give the id's/params from the pareent route
const wrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn} = require("../middleware.js");


// server side validation for reviews
const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};



// Creation Route
router.post("/", isLoggedIn , validateReview, wrapAsync(async (req, res) => {
    // first get the listing for which we want to add reviews
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${id}`);
}));

// Delete review route
router.delete("/:reviewId", isLoggedIn , wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    //  we have to delete the review object from our listing too!!
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  // what ever reviewID matches from reviews array with ths "id" we just pull it /ie: remove it
    await Review.findByIdAndDelete(reviewId); // delete the review itself
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;