const passport = require('passport');
const JWTStratergy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const env = require('./environment');
const User = require('../models/user');

let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret,
}

passport.use(new JWTStratergy(opts , function(jwtPayLoad , done){
    User.findById(jwtPayLoad._id).then(user => {
        if(user){
            return done(null, user);
        }else {
            return done(null,false);
        }
    }).catch(()=>{
        if(err) {console.log("Error in finding the user ."); return;}
    }) 
}));

module.exports = passport;