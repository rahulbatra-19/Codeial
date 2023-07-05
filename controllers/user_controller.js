const User = require('../models/user');
const forgotPass = require('../mailers/forgot_pass_mailer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');


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

module.exports.update =  async function(req, res)
{
    

    if(req.params.id == req.user.id)
    {
        try {
            let user =  await User.findById(req.params.id );
            User.uploadedAvatar(req, res, function(err){
                if(err)
                {
                    console.log("******Multer Errror", err);
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file)
                {
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..', user.avatar));
                    }
                    // this is just saving the path of the uploaded file nto the avatar feild in the user
                    user.avatar = User.avatarPath + '/' +req.file.filename;
                }
                console.log(req.file);

                user.save();
                return res.redirect('back');
            });

        } catch (error) {
            req.flash('error', error);
            return res.redirect('back');
        }
      

    }else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }

}

//  render the sign up page
module.exports.signUp  = function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile/'+req.user._id);
    }


    return res.render('user_sign_up',
    {
        title: "Codeial | Sign Up"
    });
}

//  render the sign in page
module.exports.signIn  = function(req, res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile/'+req.user._id);
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
module.exports.createSession = function(req, res )
{
    req.flash('success', 'successfully Loged in');
    return res.redirect('/');
    // return res.redirect('profile/'+req.user.id);
}

module.exports.destroySession = function(req, res)
{

    req.logout(err=>{
        console.log(err);
    });

    req.flash('success', 'successfully loged out!');

    return res.redirect('/');
}


module.exports.forgotPass  = function(req, res){


    return res.render('forgot_pass',
    {
        title: "Forgot Password?"
    });
}

module.exports.passwordForgot = function(req, res){
    User.findOne({email : req.body.email}).then(user =>{
        if(user){
        req.flash('success', ' user found');
        const token = crypto.randomBytes(6).toString('hex').slice(0, 6).toUpperCase();
        user.resetToken.token = token;
        user.resetToken.expiry = Date.now() + 60000;
        user.save();
        forgotPass.PasswordForgot(user);
        return res.redirect('/users/passwordChange');
        }
        else{
            req.flash('success', 'Error in Finding user');
            return res.redirect('back');
        }

    }).catch(err =>{
    req.flash('error', 'Error in Founding user');
    return res.redirect('/users/sign-in');

    })
}

module.exports.passChange = function(req, res){
res.render('password-change',{
    title: "Change Password"
});
}

module.exports.resetPass = function(req, res)
{
    
    
    let token = req.body.token;

    User.findOne({
        'resetToken.token': token,
        'resetToken.expiry': { $gt: Date.now() }
      }).then(user=>{
        if (!user) {
            // Token is invalid or expired
            req.flash('success', 'Invalid or expired password reset token');
            return res.redirect('/users/forgot-pass');
          }

        if(req.body.password != req.body.confirmPassword){
            req.flash('success', 'Password do not match');
            return res.redirect('back');
        }

        user.password = req.body.password;
        user.resetToken.token = null;
        user.resetToken.expiry = null;
        user.save();
        req.flash('success', 'Pasword Changed');
        return res.redirect('/users/sign-in');
      }).catch(err=>{
        console.log('Error finding user by token:', err);
      req.flash('error', 'Something went wrong');
      return res.redirect('/users/forgot-pass');
      });


}