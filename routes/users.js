const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/user_controller');

router.get('/profile', users_controller.profile);
module.exports = router;