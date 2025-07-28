const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema , reviewSchema  } = require("./schema.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn = (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        // If it's a POST request to something like /listings/:id/reviews  
        if (req.method === "POST" && req.params.id) {
            req.session.redirectUrl = `/listings/${req.params.id}`;
        } else {
            // Otherwise store the original URL (for GET requests)
            req.session.redirectUrl = req.originalUrl;  // will give the whole path of the route that we were accessing , before logging in 
        }

        req.flash("error", "You must be logged in to perform this operation");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async (req,res,next) => {
    let {id} = req.params;
    let listing = await  Listing.findById(id);
    if(! listing.owner.equals(res.locals.currUser._id)){
        req.flash("error" , "You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


// server side validation for listing
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};


// server side validation for reviews
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
};



module.exports.isAuthor = async (req,res,next) => {
    let {id , reviewId} = req.params;
    let review = await  Review.findById(reviewId);
    if(! review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}