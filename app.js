const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utilis/wrapAsync.js")
const ExpressError = require("./utilis/ExpressError.js")
const {listingSchema} = require("./schema.js")

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// mongoose startup
const MONGO_URL = 'mongodb://127.0.0.1:27017/BanglaBatash_BNB';

main()
   .then(() => {
    console.log("Connection success");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}




app.get("/", (req, res) => {
    res.send("Working home er get root")
})


// Sample data insersion 
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//        title : "Sarah Resort" ,
//        description : "Best resort in Gazipur",
//        price : 14000,
//        location : "Gazipur", 
//        country : "Bangladesh",

//     });

//     await sampleListing.save();
//     console.log("Sample was succesfully saved");
//     res.send("Successful Data insertion");
// });

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
app.get("/listings", async (req, res) => {
    let allListings = await Listing.find({});
    console.log(allListings)
    res.render("listing.ejs", {allListings});
})




// New route - show form (MUST come before :id route)
app.get("/listings/new", (req, res) => {
    res.render("new.ejs");
})




// Create route - handle form submission
app.post("/listings", 
    validateListing,
    wrapAsync( async (req, res) => {

    // Handle both nested (listing.title) and flat (title) data structures
    const listingData = req.body.listing || req.body;
    // console.log("listingData:", listingData);
    // Create new listing and save to database
    const newListing = new Listing(listingData);
    await newListing.save();

    console.log("New listing saved:", newListing);
    res.redirect("/listings");

    


}));


// Update - Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    

    let {id} = req.params;
    const listing = await Listing.findById(id);

    res.render("edit.ejs", {listing});
})



// Update - Put req route for edit 
app.put("/listings/:id", 
    validateListing,
    wrapAsync(async (req, res) => {

    let {id} = req.params; 
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");

}));


// Delete route
app.delete("/listing/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings")
})


// Show/read route - individual listing (MUST come after /listings/new)
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);

    res.render("show.ejs", {listing});
})

app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {err})
});

// Start server - must be at the end after all routes
app.listen(9090, () => {
    console.log("App is listening on port 9090")
})
