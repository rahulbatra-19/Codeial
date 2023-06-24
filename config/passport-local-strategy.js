const passport = require('passport');

const LocalStratergy = require('passport-local').Strategy;

const User = require('../models/user');


// authentication using passport
passport.use(new LocalStratergy({
    usernameField: 'email'
    },
    function(email, password, done)
    {
        // find a user and establish the identity
        User.findOne({email: email})
        .then(user =>{
            if(!user || user.password != password)
            {
                console.log('Invalid UserName Password');
                return done(null , false);
            }
            return done(null , true);
        })
        .catch(err=>{
            console.log('Error in finding user--->Passport');
            return done(err);
        });
    }
));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done)
{
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done)
{
    User.findById(id)
    .then(
        user =>{
            return done(null, user);
        }
    )
    .catch(err=>{
        console.log('Error in finding user--->Passport');
        return done(err);

});
});

module.exports = passport;
