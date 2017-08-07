// all the code with in this file is
// taken from passport api
// and it's same for any kind of
// authentication
//

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookStrategy = require('passport-facebook');
const mongoose = require('mongoose');
const keys = require('../config/keys');

// // we can get user below without require statement because
// we already loaded that to mongoose
// so all we require here is mongoose

const User = mongoose.model('appUsers');

// user and done are passportJS related parameters
// user will the user logged in or whats passed in
// done will carry if login is succes or Error
// parameter 1 in done is error object,2 is user info
// Serialize is to serialize a cookie
// deserialize is when a user tries to naviagte after he logins in
// we want to check the cookie and make sure we are giving acces to right person
// always
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ profileId: profile.id });
      if (existingUser) {
        // we already have a record
        done(null, existingUser); // this is all passport code
      } else {
        const user = await new User({
          profileId: profile.id,
          name: profile.name.givenName,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          authType: 'G'
        }).save();
        done(null, user);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.faceBookClientID,
      clientSecret: keys.faceBookClientSecret,
      callbackURL: '/auth/facebook/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ profileId: profile.id });
      if (existingUser) {
        // we already have a record
        console.log('Hello 2 inside this exiting ', existingUser);
        done(null, existingUser); // this is all passport code
      } else {
        console.log('Hello Hello Hello o matachepaku opillo');
        const user = await new User({
          profileId: profile.id,
          name: profile.name.givenName,
          displayName: profile.displayName,
          email: '',
          authType: 'FB'
        }).save();
        console.log("I'm saved");
        done(null, user);
      }
    }
  )
);
