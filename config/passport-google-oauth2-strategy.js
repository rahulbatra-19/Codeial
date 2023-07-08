const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const env = require('./environment');
const User = require('../models/user');

// Tell passport to use a new strategy for user login
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_Secret,
    callbackURL:  env.google_callback_url,
}, function(accessToken, refreshToken, profile, done) {
    // Find the user
    User.findOne({ email: profile.emails[0].value })
        .then(user => {
            console.log(accessToken, refreshToken);

            console.log(profile);
            if (user) {
                // If found, set this user as req.user
                return done(null, user);
            } else {
                // If not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }).then(user => {
                    return done(null, user);
                }).catch(err => {
                    console.log('Error in creating user', err);
                    return done(err);
                });
            }
        })
        .catch(err => {
            console.log('Error in Google strategy-passport', err);
            return done(err);
        });
}));

module.exports = passport;
