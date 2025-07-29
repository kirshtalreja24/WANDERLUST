const Listing = require("../models/listing");

module.exports.index = async (req, res, next) => {
    const all_listings = await Listing.find({});
    res.render("listings/index.ejs", { all_listings });
};

module.exports.renderNewForm =  (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListings = async (req, res, next) => {
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
};


module.exports.createListing = async (req, res, next) => {
    const newList = new Listing(req.body.listing);
    // console.log(req.user);
    newList.owner = req.user._id;
    await newList.save()
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res, next) => {
    let { id } = req.params;
    const list = await Listing.findById(id);
    if (!list) {
        req.flash("error", "Listing you requested for doesnot exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { list });
};

module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params;
    
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
