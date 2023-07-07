const User = require('../models/user');
const Friendship = require('../models/friendship');


module.exports.friendShip = async function(req, res){
    try {
        let isFriend = false;
        let friend = await User.findById(req.query.id).populate('friendships');

        let existingFriend = await Friendship.findOne({
            $or:[
                { from_user: req.user._id , to_user : req.query.id },
                { from_user: req.query.id , to_user : req.user._id }
            ]
        });
        console.log(existingFriend);
        if(existingFriend){
            friend.friendships.pull(existingFriend._id);
            req.user.friendships.pull(existingFriend._id);
            friend.save();
            req.user.save();
            existingFriend.deleteOne();
            isFriend = true;
        }else{
            let newFriendship = await Friendship.create({
                from_user: req.user._id ,
                to_user: req.query.id
            });

            friend.friendships.push(newFriendship._id);
            req.user.friendships.push(newFriendship._id);
            req.user.save();
            friend.save();
        }
        // console.log(friend.friendships);

        return res.json(200, {
            message :'Request successfull',
            data : {
                isFriend : isFriend,
                friends : req.user.friendships
            }
        })

    } catch (error) {
        console.log(error);
        return res.json(500, {
            message: 'Internal Server Error'
        });
    }   
}