require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
// const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:2345/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log("user", request,accessToken,refreshToken);
      console.log("profile" , profile)
      let user = await User.findOne({ email: profile?.email }).lean().exec();

      let miniData = {
        fname:  profile.given_name,
        lname: profile.family_name,
        profileEmail : profile.email,
        profilePicture : profile.picture
      }
      //   // console.log("miniData" ,profile.given_name,  profile.family_name, profile.picture, profile.email  )
        console.log("miniData data", miniData)
      return done(null, user);
    }
  )
);

module.exports = passport;
