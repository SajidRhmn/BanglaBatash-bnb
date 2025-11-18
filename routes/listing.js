const express = require('express');
const router = express.Router();
// const Listing = require("../models/listing.js");
const wrapAsync = require("../utilis/wrapAsync.js");
// const ExpressError = require("../utilis/ExpressError.js");
// const {listingSchema, reviewSchema} = require("../schema.js");
const {isLoggedIn, isOwner, validateListing, validateReview} = require("../middleware.js");
const multer = require('multer');
const upload = multer( {dest : 'uploads/'} );

const listingController = require("../controllers/listings.js")





router.route("/")
    // 1. Index route - show all listings
    .get( wrapAsync( listingController.index ))
    // 3. Create route - handle form submission
    .post(
        isLoggedIn,
        validateListing,
        wrapAsync( listingController.createListing )
    );

//     .post(upload.single('listing[image]'), (req, res) => {
//     res.send(req.file);
//   });




// 2. New route - show form (MUST come before :id route)
router.get("/new", isLoggedIn, listingController.renderNewForm)


 


router.route("/:id")
    // Show/read route - individual listing (MUST come after /listings/new)
    .get( wrapAsync( listingController.showListing )
     )
    // Update - Put req route for edit
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing) 
    )
    // Delete route
    .delete(
        isLoggedIn, 
        isOwner,
        listingController.destroyListing
    );



// Update/Edit Route
router.get("/:id/edit", 
    isLoggedIn, 
    isOwner,
    listingController.renderEditForm
    )














module.exports = router;
