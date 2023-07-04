const Post  = require('../../../models/posts');
const Comment =  require('../../../models/comments');


module.exports.index = async function(req, res)
{
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user',
        },
        options: {
            sort: '-createdAt' // Sort comments in descending order based on createdAt
        }
    });


    return res.json(200, {
        message: "List of Posts",
        posts : posts
    });
}


module.exports.destroy =  async function(req, res)
{
    try {

        let post =  await Post.findById(req.params.id);

        if(post.user == req.user.id){
            await Comment.deleteMany({post: req.params.id});
            post.deleteOne();

            return res.json(200, {
                message: "Posts and associated comments deleted successfully!"
            });
        }else{
            return res.json(401, {
                message: 'You cannot deletePost'
            });
        }

    }        catch (error) {

            return res.json(500,{
                message: "internal Server error"
            });
        }
}
