const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    // first get the listing for which we want to add reviews
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    // console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    //  we have to delete the review object from our listing too!!
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });  // what ever reviewID matches from reviews array with ths "id" we just pull it /ie: remove it
    await Review.findByIdAndDelete(reviewId); // delete the review itself
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};