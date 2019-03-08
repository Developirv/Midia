
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var creator = require('../models/creator');

// configuring Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    // a user has logged in via OAuth
    creator.findOne({ 'googleId': profile.id }, function(err, creator) {
      if (err) return cb(err);
      if (creator) {
        if (!creator.avatar) {
          creator.avatar = profile.photos[0].value;
          creator.save(function(err) {
            return cb(null, creator);
          });
        } else {
          return cb(null, creator);
        }
      } else {
        // we have a new creator signed in via OAuth
        var newCreator = new Creator({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newCreator.save(function(err) {
          if (err) return cb(err);
          return cb(null, newCreator);
        });
      }
    });
  }
));

passport.serializeUser(function(creator, done) {
  done(null, creator.id);
});

passport.deserializeUser(function(id, done) {
  Creator.findById(id, function(err, creator) {
    done(err, creator);
  });
});


