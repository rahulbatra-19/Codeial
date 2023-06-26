const Post = require('../models/posts');
module.exports.home = function(req, res)
{
    // console.log(req.cookies);
    // res.cookie('user_id', 30);

    Post.find().populate('user').then( posts=>{
        return res.render('home',{
            title: 'Codeial | Home',
            posts : posts
        });

    }

    ).catch(err =>{

    });
    
}