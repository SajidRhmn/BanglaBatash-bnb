require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utilis/wrapAsync.js");
const ExpressError = require("./utilis/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

// ROuters
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRouter = require("./routes/user.js");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


// mongoose startup
// const MONGO_URL = 'mongodb://127.0.0.1:27017/BanglaBatash_BNB';
const dbUrl = process.env.ATLASDB_URL

const store = MongoStore.create({
    mongoUrl: dbUrl,
    // crypto: {
    //     secret: "mysupersecretcode",
    // },
    touchAfter: 24 * 3600, // 24 hours in seconds
});

store.on("error" , (err) => {
    console.log("Error in MONGO SESSION STORE", err);
});


// Session options
const sessionOptions = {
    store,
    secret : process.env.SECRET ,
    resave : false,
    saveUninitialized : true,
    cookie : {
       expires : Date.now() + 7*24*60*60*1000, //7days,24hours,60min,60sec,1000ms.
       maxAge : 7*24*60*60*1000,
       httpOnly : true  // to prevent cross-scripting attacks
    }
};


//Use session
app.use(session(sessionOptions));
// Use flash
app.use(flash());


// implementing passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




main()
   .then(() => {
    console.log("Connection success");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}



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


// middleware for flash
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})



// Demo user
// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "abcdNAME12"  
//     });
    
//     // static method register()
//     let registeredUser = await User.register(fakeUser, "password");
//     res.send(registeredUser);
// })




app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRouter);




app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});



app.use((err, req, res, next) => {
    // If headers already sent, delegate to Express's default error handler
    if (res.headersSent) {
        return next(err);
    }
    let { statusCode = 500, message = "Something went wrong!" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs", {err})
});



// Start server - must be at the end after all routes
app.listen(9090, () => {
    console.log("App is listening on port 9090")
})
