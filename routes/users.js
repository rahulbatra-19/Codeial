const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');

router.get('/profile', passport.checkAuthentication ,usersController.profile);

router.get('/profile/:id', passport.checkAuthentication ,usersController.profile);
router.post('/update/:id', passport.checkAuthentication ,usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);


router.post('/create', usersController.create);
router.get('/forgot-pass', usersController.forgotPass);

router.post('/passwordForgot', usersController.passwordForgot);
router.get('/passwordChange', usersController.passChange); 
router.post('/reset-password', usersController.resetPass);

// use passport as middle ware to authneticate
router.post('/create-session', passport.authenticate(
    'local', 
    { failureRedirect: '/users/sign-in'},
    ) ,usersController.createSession);

router.get('/sign-out', usersController.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect:'/users/sign-in'}), usersController.createSession);




module.exports = router;