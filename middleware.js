const Listing = require("./models/listing.js")
const Review = require("./models/review.js");
const ExpressError = require("./utilis/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");



module.exports.isLoggedIn = (req, res, next) => {
        
        if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req, res, next) => {
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl ;
    }
    next();
}


module.exports.isOwner = async (req, res, next) => {

  // Checking permission of the user to edit
    let {id} = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(res.locals.currUser._id)) {
         req.flash("error", "You don't have the permission to make changes to  this listing.");
         return res.redirect(`/listings/${id}`);
    }
    next();
};



module.exports.isReviewAuthor = async (req, res, next) => {

  // Checking permission of the user to edit
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)) {
         req.flash("error", "You don't have the permission to make changes to  this review.");
         return res.redirect(`/listings/${id}`);
    }
    next();
};







module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(","); // Note: The screenshot shows "," not ";"
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};




module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(","); // Note: The screenshot shows "," not ";"
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};