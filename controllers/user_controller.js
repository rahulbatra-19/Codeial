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

}

// Sign in and to create the session for the user
module.exports.createSession = function(req, res)
{

}