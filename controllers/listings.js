const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

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

    // Forward-Geocoding the location
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
    })
    .send()
    

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Assign the current user's ID as the owner

    // Extract url and path from cloudinary upload if file exists
    if (req.file) {
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url, filename};
    }

    newListing.owner = req.user._id;
    newListing.geometry = response.body.features[0].geometry;

    let savedListing = await newListing.save();
    console.log(savedListing);
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

      let originalImageUrl = listing.image.url.replace("/upload", "/upload/c_auto,g_auto:thirds_0,h_250,w_350")
      res.render("edit.ejs", {listing, originalImageUrl});
  };


module.exports.updateListing =  async (req, res) => {
  
      let {id} = req.params; 
    
      let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
      
      if ( typeof req.file != "undefined" ) {
        let url = req.file.path;
        let filepath = req.file.filename;
        listing.image = {url, filepath};
        await listing.save();
      };

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

