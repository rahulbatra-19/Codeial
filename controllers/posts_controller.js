const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req, res)
{
    Post.create({
        content: req.body.content,
        user: req.user._id
    }).then(()=>{
        return res.redirect('back') ;
    }).catch(err => {
        console.log('error in creating the post');
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
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    } catch (error) {
        console.log(error, "Error");
    }

    
    
}

