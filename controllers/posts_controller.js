const Post = require('../models/posts');
const Comment = require('../models/comments');
const Like = require('../models/like');

// module.exports.create = async function(req, res)
// {
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }).then(post=>{
//         if(req.xhr)
//         {
//             return res.status(200).json({
//                 data : {
//                     post : post
//                 }, 
//                 message : "Post Created!"
//             });
//         }
//         req.flash('success', "Post Created");
//         return res.redirect('back') ;
//     }).catch(err => {
//         req.flash('error', err);
//         return;
//     });
// }

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        await post.populate('user');
        if (req.xhr){
            return res.status(200).json({
                data: {
                    post: post,
                    user: req.user
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}



module.exports.destroy =  async function(req, res)
{
    try {
        let post =  await Post.findById(req.params.id);



        // .id means converting the object _id into string
        if(post.user == req.user.id)
        {

            // delete the associated likes for post and all its comments' likes too
            await Like.deleteMany({likeable: post, onModel : 'Post'});
            await Like.deleteMany( {_id: {$in: post.comments}});


            let comment = await Comment.deleteMany({post: req.params.id});
            post.deleteOne();

            if(req.xhr)
            {
                return res.status(200).json({
                    data : {
                        post_id : req.params.id
                    },
                    message: "Post deleted "
                });
            
            }
        req.flash('success', 'Posts and associated comments destroyed');
            return res.redirect('back');

        }
        else{
            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error', error);
        return res.redirect('back');
    }

    
    
}

