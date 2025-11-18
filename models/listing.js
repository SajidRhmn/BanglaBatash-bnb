const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;
const Review = require("./review.js");

// Schema Rules
const listingSchema = new Schema({
      title : {
        type : String,
        required : true,
      },

      description : {
        type : String,
      },

      image : {
        type: String,
        default: "https://www.morebusiness.com/wp-content/uploads/2016/02/free-stock-photos.jpg",
        set: (v) =>
          v === ""
            ? "https://www.morebusiness.com/wp-content/uploads/2016/02/free-stock-photos.jpg"
            : v,
      },

      price : {
        type : Number,
        required : true
      }, 

      location : {
        type : String,
      },

      country : {
        type : String,
      },

      reviews : [
        {
          type : Schema.Types.ObjectId,
          ref : "Review"  , // name of reviews wala model
        }
      ],

      owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
      },

});


// Middleware for Deleting all reviews, if a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id : {$in : listing.reviews } });
  }
})



// model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing ;