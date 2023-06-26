const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts') );
router.use('/comments', require('./comments'));
// for any further routes
// router.use('/routerName', require('/routes'));


module.exports = router;