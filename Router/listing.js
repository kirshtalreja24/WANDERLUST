const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); // our files will upload on cloudinary storage/folder

const listingController = require("../controller/listing.js");

router.route("/")
    .get(wrapAsync(listingController.index)) //Index Route  
    .post(isLoggedIn,
        upload.single('listing[image]'), // multer processes the image
        validateListing,
        wrapAsync(listingController.createListing) // Create Route
    );


//New  Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListings)) // Show Route
    .put(isLoggedIn, isOwner,   // update route
        upload.single('listing[image]'), // multer processes the image
        validateListing, 
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner,    // destory route
        wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;    