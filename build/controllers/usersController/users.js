"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: "getRegistrationPage",
    value: function getRegistrationPage(req, res) {
      res.render('register');
    }
  }, {
    key: "registerUser",
    value: function registerUser(req, res) {
      var _req$body = req.body,
          name = _req$body.name,
          email = _req$body.email,
          password = _req$body.password,
          password2 = _req$body.password2;
      var errors = []; // Check required fields

      if (!name || !email || !password || !password2) {
        errors.push({
          msg: 'Please fill in all fields'
        });
      } // Check passwords match


      if (password !== password2) {
        errors.push({
          msg: 'Passwords do not match'
        });
      } // Check pass length


      if (password.length < 6) {
        errors.push({
          msg: 'Password should be at least 6 characters'
        });
      }

      if (errors.length > 0) {
        res.render('register', {
          errors: errors,
          name: name,
          email: email,
          password: password,
          password2: password2
        });
      } else {
        // Validation passed
        _User.default.findOne({
          email: email
        }).then(function (user) {
          if (user) {
            // User exists
            errors.push({
              msg: 'User already exist with this email'
            });
            res.render('register', {
              errors: errors,
              name: name,
              email: email,
              password: password,
              password2: password2
            });
          } else {
            var newUser = new _User.default({
              name: name,
              email: email,
              password: password
            }); // Hash password

            _bcryptjs.default.genSalt(10, function (err, salt) {
              return _bcryptjs.default.hash(newUser.password, salt, function (err, hash) {
                if (err) throw err; // Set password to hashed

                newUser.password = hash; // Save user

                newUser.save().then(function (user) {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/users/login');
                }).catch(function (err) {
                  return console.log(err);
                });
              });
            });
          }
        });
      }
    }
  }, {
    key: "getLoginPage",
    value: function getLoginPage(req, res) {
      res.render('welcome');
    }
  }, {
    key: "getWelcomePage",
    value: function getWelcomePage(req, res) {
      res.render('welcome');
    }
  }, {
    key: "dashboard",
    value: function dashboard(req, res) {
      res.render('dashboard', {
        user: req.user
      });
    }
  }, {
    key: "login",
    value: function login(req, res, next) {
      _passport.default.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
    }
  }, {
    key: "logout",
    value: function logout(req, res) {
      req.logout();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/users/login');
    }
  }]);

  return UsersController;
}();

var UserController = new UsersController();
var _default = UserController;
exports.default = _default;
//# sourceMappingURL=users.js.map