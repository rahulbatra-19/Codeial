const Comment = require('../models/comments');
const Post = require('../models/posts');
module.exports.create = async function(req, res)
{
    try{
    let post = await Post.findById(req.body.post);

        if(post)
        {
            let comment = Comment.create({
                content : req.body.content,
                post: req.body.post,
                user: req.user._id
            })
                post.comments.push(comment);
                post.save();    // whenever updating save
                req.flash('success', 'Comment published!');
                res.redirect('/');
            
        }
    }
    catch(err){
    console.log(err);
    };
}

module.exports.destroy = function(req, res)
{
    Comment.findById(req.params.id).then(
        comment =>{
            if(comment.user.toString() === req.user.id){
                let postId = comment.post;

                comment.deleteOne();

                Post.findByIdAndUpdate(postId , {$pull: {comments: req.params.id}}).then(()=>{
                    req.flash('success', 'Comment deleted!');
                    return res.redirect('back');
                }).catch(err =>{
                    req.flash('error', err);
                    return res.redirect('back');
                })
            }
            else{
                req.flash('error', 'Unauthorized');
                return res.redirect('back');
            }
        }
    ).catch(err =>{
        req.flash('error', err);
        return res.redirect('back');
    });
}