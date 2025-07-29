const express = require("express");
const router = express.Router({ mergeParams: true });  // mergeParams:true -> will basically give the id's/params from the pareent route
const wrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn , validateReview , isAuthor} = require("../middleware.js");

const reviewController = require("../controller/review.js");

// Creation Route
router.post("/", isLoggedIn , validateReview, wrapAsync(reviewController.createReview));

// Delete review route
router.delete("/:reviewId", isLoggedIn, isAuthor , wrapAsync(reviewController.destroyReview));

module.exports = router;