const User = require('../models/user');

module.exports.profile = function(req, res){
    // res.end('<h1> User Profile </h1>');

    User.findById(req.params.id).then(user =>{
        return res.render('user_profile',
        {
            title: 'User',
            profile_user: user
        });
    });
   
}

module.exports.update = function(req, res)
{
    if(req.params.id == req.user.id)
    {
        User.findByIdAndUpdate(req.params.id , req.body).then(user =>{
            req.flash('success', 'Updated!');
            return res.redirect('back');
        });

    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

//  render the sign up page
module.exports.signUp  = function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile/',user.id);
    }


    return res.render('user_sign_up',
    {
        title: "Codeial | Sign Up"
    });
}

//  render the sign in page
module.exports.signIn  = function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile/'+user.id);
    }

    return res.render('user_sign_in',
    {
        title: "Codeial | Sign in"
    });
}

// get up Sign up data 
module.exports.create = function(req, res)
{
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
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
            req.flash('success', 'You have signed up, login to continue!');
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
    req.flash('success', 'successfully Loged in');
    return res.redirect('profile/'+req.user.id);
}

module.exports.destroySession = function(req, res)
{

    req.logout(err=>{
        console.log(err);
    });

    req.flash('success', 'successfully loged out!');

    return res.redirect('/');
}