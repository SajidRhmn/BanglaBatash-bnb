const mongoose = require("mongoose");
const Schema = mongoose.Schema

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
      }, 

      location : {
        type : String,
      },

      country : {
        type : String,
      },
});


// model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing ;