const Listing = require("../models/listing");
const mbxGeoCoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeoCoding({ accessToken: mapToken });

module.exports.index = async (req, res, next) => {
    const all_listings = await Listing.find({});
    res.render("listings/index.ejs", { all_listings });
};

module.exports.renderNewForm = (req, res) => {
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
    let response =  await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1, // one location will possibly give multiple combinations of [lng, lat] , we just need 1 : ie limit:1
    }) .send()
       

    let url = req.file.path;
    let filename = req.file.filename;
    const newList = new Listing(req.body.listing);
    newList.owner = req.user._id;
    newList.image = { url, filename };

    newList.geometry = response.body.features[0].geometry;

    let savedlisting = await newList.save();
    // console.log(savedlisting);
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
    let originalImageUrl = list.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { list, originalImageUrl });
};

module.exports.updateListing = async (req, res, next) => {
    let { id } = req.params;


    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });// all things coming from req.body will get updated here 
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;

        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res, next) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
