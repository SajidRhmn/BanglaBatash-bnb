const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utilis/wrapAsync.js")
const ExpressError = require("../utilis/ExpressError.js")
const {listingSchema, reviewSchema} = require("../schema.js")


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(","); // Note: The screenshot shows "," not ";"
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};



// Index route - show all listings
router.get("/", async (req, res) => {
    let allListings = await Listing.find({});
    console.log(allListings)
    res.render("listing.ejs", {allListings});
})




// New route - show form (MUST come before :id route)
router.get("/new", (req, res) => {
    res.render("new.ejs");
})




// Create route - handle form submission
router.post("/", 
    validateListing,
    wrapAsync( async (req, res) => {

    // Handle both nested (listing.title) and flat (title) data structures
    const listingData = req.body.listing || req.body;
    // console.log("listingData:", listingData);
    // Create new listing and save to database
    const newListing = new Listing(listingData);
    await newListing.save();

    req.flash("success", "New Listing created!");
    res.redirect("/listings");

    


}));


// Update - Edit Route
router.get("/:id/edit", async (req, res) => {
    

    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "The listing does not exist!");
        return res.redirect("/listings");
    }
    res.render("edit.ejs", {listing});
})



// Update - Put req route for edit 
router.put("/:id", 
    validateListing,
    wrapAsync(async (req, res) => {

    let {id} = req.params; 
    await Listing.findByIdAndUpdate(id, {...req.body.listing});

    req.flash("success", "Listing Updated!");
    res.redirect("/listings");

}));


// Delete route
router.delete("/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
})






// Show/read route - individual listing (MUST come after /listings/new)
router.get("/:id", wrapAsync(async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
        req.flash("error", "The listing does not exist!");
        return res.redirect("/listings");
    }

    res.render("show.ejs", {listing});
}));



module.exports = router;
