const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req, res)
{
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(()=>{
        req.flash('success', "Post Created");
        return res.redirect('back') ;
    }).catch(err => {
        req.flash('error', err);
        return;
    });
}



module.exports.destroy =  async function(req, res)
{
    try {
        let post =  await Post.findById(req.params.id);



        // .id means converting the object _id into string
        if(post.user == req.user.id)
        {

            let comment = await Comment.deleteMany({post: req.params.id});
            post.deleteOne();

            req.flash('success', 'Posts and associated comments destroyed');
            return res.redirect('back');
        }
        else{
            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', err);
        return res.redirect('back');
    }

    
    
}

