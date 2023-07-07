const express = require('express');
const router = express.Router();
const friendsController  = require('../controllers/friends_controller');

router.post('/toggle', friendsController.friendShip);


module.exports = router;