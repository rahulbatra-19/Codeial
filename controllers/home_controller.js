const Post = require('../models/posts');
const User = require('../models/user');
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

        let users =  await User.find();
        return res.render('home',{
            title: 'Codeial | Home',
            posts : posts,
            all_users : users
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