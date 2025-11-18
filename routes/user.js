const express = require("express"); 
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utilis/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js")

// User controller
const userController = require("../controllers/users.js")


router.route("/signup")
    // Signup Get route
    .get( userController.renderSignupForm )

    //Signup post route
    .post( userController.signUp);



router.route("/login")
    // login Get route
    .get( userController.renderLoginForm)

    // Login POST route
    .post(
        saveRedirectUrl, 
        passport.authenticate("local", {
        failureRedirect : "/login",
        failureFlash : true,
    }),  userController.loginRoute  );




// logout router
router.get("/logout", userController.logoutRoute );







module.exports = router;