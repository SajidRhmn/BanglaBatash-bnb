const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing  = require("../models/listing.js");
const User = require("../models/user.js"); 


// mongoose startup
const MONGO_URL = 'mongodb://127.0.0.1:27017/BanglaBatash_BNB';

main()
   .then(() => {
    console.log("Connection to DB");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}



const initDB = async () => {
    await Listing.deleteMany({});
    
    // Re-init the data for adding owner property
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner : '691a5838c8c388178535136d', // a random id (24 characters)
    }));

      
    await Listing.insertMany(initData.data);
    console.log("Data was initialized and inserted")
}

initDB();