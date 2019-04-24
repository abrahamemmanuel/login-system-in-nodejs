import express from 'express';
import app from '../server.js';
import { ensureAuthenticated } from '../config/auth';
import UserController from '../controllers/usersController/users';

const router = express.Router();

// @route   /
// @desc     Get  User Welcome page
// @access   Public
// @method   GET
router.get('/', UserController.getWelcomePage);

// @route   /dashboard
// @desc     User dashboard view
// @access   Private
// @method   GET
router.get('/dashboard', ensureAuthenticated, UserController.dashboard);

// @route   /users/register
// @desc     Get  User registration page
// @access   Public
// @method   GET
router.get('/users/register', UserController.getRegistrationPage);

// @route   /users/register
// @desc     Register User
// @access   Public
// @method   POST
router.post('/users/register', UserController.registerUser);

// @route   /users/login
// @desc     Get User Login page
// @access   Public
// @method   GET
router.get('/users/login', UserController.getLoginPage);

// @route   /users/login
// @desc     Login User
// @access   Public
// @method   POST
router.post('/users/login', UserController.login);


// @route   '/users/login
// @desc     Logout User
// @access   Public
// @method   GET
router.get('/users/logout', UserController.logout);




export default router;
