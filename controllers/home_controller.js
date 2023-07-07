const Post = require('../models/posts');
const User = require('../models/user');
const Friendships = require('../models/friendship');
module.exports.home =  async function(req, res)
{
    // console.log(req.cookies);
    // res.cookie('user_id', 30);

    try {
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate('likes')
        .populate({
            path: 'comments',
            populate: {
                path: 'user',
            },
            populate: {
                path : 'likes'
            },
            options: {
                sort: '-createdAt' // Sort comments in descending order based on createdAt
            }
        });

        let users =  await User.find().populate('friendships', 'to_user');
        let Friendship =[];
        if(req.user){
        for( friend of  req.user.friendships){
            let friends = await Friendships.findById(friend._id);
            let touser = await User.findById(friends.to_user);
            let fromuser = await User.findById(friends.from_user);
            if(touser.id == req.user.id){
                Friendship.push(fromuser);
            }else{
                Friendship.push(touser);
            }
            }
        }

        return res.render('home',{
            title: 'Codeial | Home',
            posts : posts,
            all_users : users,
            friendships : Friendship
        });   
        } catch (error) {
            console.log(error,"error");
        }
      
}




// // Post.find({})
// .populate('user')
// .populate({
//     path: 'comments',
//     populate: {
//         path: 'user',
//         model: 'User'
//     }
// })
// .then( posts=>{

//     User.find().then(
//         user =>{

        
//         return res.render('home',{
//             title: 'Codeial | Home',
//             posts : posts,
//             all_users : user 
//         });
// }).catch();
   

// }

// ).catch(err =>{

// });

// }