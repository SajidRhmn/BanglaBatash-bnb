const express = require("express"); 
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utilis/wrapAsync.js");
const passport = require("passport");


// Signup Get route
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});




//Signup post route
router.post("/signup", wrapAsync (async (req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);

        console.log(registeredUser);
        req.flash("success", "Welcome to BanglaBatash-BNB!");
        res.redirect("/listings");
       
    }
    catch(err){
        req.flash("error", err.message);
        res.redirect("/signup")
    }

}));


// login Get route
router.get("/login", (req, res) => {
    res.render("users/login.ejs")
})




// Login POST route
router.post(
    "/login", 
    passport.authenticate("local", {
    failureRedirect : "/login",
    failureFlash : true,
}),

async (req, res) => {
    req.flash("success", "Welcome back to BanglaBatash-BNB! ");
    res.redirect("/listings")
});


module.exports = router;