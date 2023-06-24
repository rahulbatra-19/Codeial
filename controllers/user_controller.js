const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1> User Profile </h1>');
    if(req.cookies.user_id)
    {
        User.findById(req.cookies.user_id).
        then(user =>{
            if(user)
            {
                return res.render('user_profile', {
                    title: 'User',
                    user: user
                } );
            }
            return res.redirect('/users/sign-in');
        }).catch(err =>{
            console.log('Error: ', err);
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }

   
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

// sign out form page
module.exports.signOut = function(req, res)
{
    User.findById(req.cookies.user_id).
    then(user =>{
        res.clearCookie('user_id');
        return res.redirect('/users/sign-in');
    }).catch(err =>{
        console.log('Error: ', err);
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

    // steps to authenticate 
    // find the user 
    User.findOne({email: req.body.email}).then(user => {

    // handle user found 

        if(user)
        {
            // handle passsword which doesn't match 
            if(user.password != req.body.password)
            {
                return res.redirect('back');
            }
            // handle session creation 
            res.cookie('user_id', user.id);
            return res.redirect('/users/profile');
        }
        else{

           //  handle user not found 
            res.redirect('back');
        }
    }).catch(err =>{
        console.log('Error in finding user in signing in');
        return;});




}