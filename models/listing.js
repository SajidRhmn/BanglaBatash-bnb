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
         url : String, 
         filename : String
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

      geometry : {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }

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