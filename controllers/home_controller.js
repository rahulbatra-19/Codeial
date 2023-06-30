const Post = require('../models/posts');
const User = require('../models/user');
module.exports.home = function(req, res)
{
    // console.log(req.cookies);
    // res.cookie('user_id', 30);

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
            model: 'User'
        }
    })
    .then( posts=>{

        User.find().then(
            user =>{

            
            return res.render('home',{
                title: 'Codeial | Home',
                posts : posts,
                all_users : user 
            });
    }).catch();
       

    }

    ).catch(err =>{

    });
    
}