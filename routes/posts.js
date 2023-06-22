const express = require('express');
const router = express.Router();
const posts_controllers = require('../controllers/posts_controller');

router.get('/', posts_controllers.posts);

module.exports = router;