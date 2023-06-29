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

module.exports.destroy = function(req, res)
{
    Comment.findById(req.params.id).then(
        comment =>{
            if(comment.user.toString() === req.user.id){
                let postId = comment.post;

                comment.deleteOne();

                Post.findByIdAndUpdate(postId , {$pull: {comments: req.params.id}}).then(()=>{
                    return res.redirect('back');
                }).catch(err =>{
                    console.log(err);
                    return res.redirect('back');
                })
            }
            else{
                return res.redirect('back');
            }
        }
    ).catch();
}