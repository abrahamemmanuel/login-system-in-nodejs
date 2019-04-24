"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _server = _interopRequireDefault(require("../server.js"));

var _auth = require("../config/auth");

var _users = _interopRequireDefault(require("../controllers/usersController/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // @route   /
// @desc     Get  User Welcome page
// @access   Public
// @method   GET


router.get('/welcome', _users.default.getWelcomePage); // @route   /dashboard
// @desc     User dashboard view
// @access   Private
// @method   GET

router.get('/dashboard', _auth.ensureAuthenticated, _users.default.dashboard); // @route   /users/register
// @desc     Get  User registration page
// @access   Public
// @method   GET

router.get('/users/register', _users.default.getRegistrationPage); // @route   /users/register
// @desc     Register User
// @access   Public
// @method   POST

router.post('/users/register', _users.default.registerUser); // @route   /users/login
// @desc     Get User Login page
// @access   Public
// @method   GET

router.get('/users/login', _users.default.getLoginPage); // @route   /users/login
// @desc     Login User
// @access   Public
// @method   POST

router.post('/users/login', _users.default.login); // @route   '/users/login
// @desc     Logout User
// @access   Public
// @method   GET

router.get('/users/logout', _users.default.logout);
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map