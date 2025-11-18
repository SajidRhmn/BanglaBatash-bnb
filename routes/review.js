const express = require('express');
const router = express.Router( {mergeParams : true} );
const Review = require("../models/review.js");
const wrapAsync = require("../utilis/wrapAsync.js")
const ExpressError = require("../utilis/ExpressError.js")
const {listingSchema, reviewSchema} = require("../schema.js")
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing, validateReview, isReviewAuthor} = require("../middleware.js");


const reviewController = require("../controllers/reviews.js")



// Reviews er POST Route
router.post("", 
    isLoggedIn,
    validateReview, 
    wrapAsync( reviewController.createReview ));




// Delete reviews route
router.delete("/:reviewId",
    isLoggedIn,
    wrapAsync(isReviewAuthor),
    wrapAsync( reviewController.destroyReview ));


module.exports = router;