const Listing = require("../models/listing.js");

// index
module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    //console.log(allListings)
    res.render("listing.ejs", {allListings});
};


module.exports.renderNewForm = (req, res) => {
    res.render("new.ejs");
};




module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id)
    .populate( {path : "reviews" , populate : { path : "author"}} )
    .populate("owner");

    if (!listing) {
        req.flash("error", "The listing does not exist!");
        return res.redirect("/listings");
    }
    //console.log(listing);
    res.render("show.ejs", {listing});
};


module.exports.createListing = async (req, res, next) => {
    // extract url and filename from cloudinary upload
    let url = req.file.path ;
    let filename = req.file.filename ; 

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Assign the current user's ID as the owner
    newListing.image = {url, filename};
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  };


module.exports.renderEditForm = async (req, res) => {
      let {id} = req.params;
      const listing = await Listing.findById(id);
      if (!listing) {
          req.flash("error", "The listing does not exist!");
          return res.redirect("/listings");
      }

      let originalImageUrl = listing.image.url;
      if (originalImageUrl) {
        // Check if it's a Cloudinary URL
        if (originalImageUrl.includes("/upload")) {
          originalImageUrl = originalImageUrl.replace("/upload", "/upload/c_crop,g_auto,h_250,w_400");
        }
        // For Unsplash URLs, modify the width parameter
        else if (originalImageUrl.includes("unsplash.com")) {
          originalImageUrl = originalImageUrl.replace(/w=\d+/, "w=250");
        }
      }

      res.render("edit.ejs", {listing, originalImageUrl});
  };


module.exports.updateListing =  async (req, res) => {
  
      let {id} = req.params; 
      
      let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
      
      if (typeof req.file != "undefined") {
        let url = req.file.path ;
        let filename = req.file.filename ;
        listing.image = {url, filename};
        await listing.save();
      }
          
      req.flash("success", "Listing Updated!");
      res.redirect(`/listings/${id}`);

  };


module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

