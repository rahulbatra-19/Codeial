const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1> User Profile </h1>');
    return res.render('user_profile',
    {
        title: 'User'
    });
}

//  render the sign up page
module.exports.signUp  = function(req, res){
    return res.render('user_sign_up',
    {
        title: "Codeial | Sign Up"
    });
}

//  render the sign in page
module.exports.signIn  = function(req, res){
    return res.render('user_sign_in',
    {
        title: "Codeial | Sign in"
    });
}

// get up Sign up data 
module.exports.create = function(req, res)
{
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}).then(user=>{
        if(!user)
        {
            User.create(req.body)
            .then(()=>{ return res.redirect('/users/sign-in');})
            .catch((err) =>{ 
                console.log('Error in creating user while signing up');
            return;
        });
        }
        else{
            return res.redirect('back');
        }
    }).catch(err =>{
        console.log('Error in finding user in signing up');
        return;
    });
        


}

// Sign in and to create the session for the user
module.exports.createSession = function(req, res)
{
    return res.redirect('/');
}