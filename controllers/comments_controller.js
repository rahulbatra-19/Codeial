const Comment = require('../models/comments');
const Post = require('../models/posts');
module.exports.create = function(req, res)
{
    Post.findById(req.body.post).then(post =>{

        if(post)
        {
            Comment.create({
                content : req.body.content,
                post: req.body.post,
                user: req.user._id
            }).then(comment => {
                post.comments.push(comment);
                post.save();    // whenever updating save
                res.redirect('/');
            }).catch(err =>{

            })
        }

    }).catch(err=>{
    // handle err
    console.log(err);
    });
}