"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _expressEjsLayouts = _interopRequireDefault(require("express-ejs-layouts"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _keys = _interopRequireDefault(require("./config/keys"));

var _index = _interopRequireDefault(require("./routes/index"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // Passport Config

require('./config/passport')(_passport.default); //Static folder


app.use(_express.default.static(_path.default.join(__dirname, './public/')));
app.use('/css', _express.default.static(_path.default.join(__dirname, 'public/css'))); //Set View Engine

app.set('views', './views');
app.set('view engine', 'ejs'); // // EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');
// Bodyparser

app.use(_express.default.urlencoded({
  extended: true
})); //Express session

app.use((0, _expressSession.default)({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
})); // SessionStore = require('session-mongoose')(express)
// app.use(
//   express.session({
//     store: new SessionStore({
//     url: db,
//     interval: 1200000
//   }),
//   cookie: { maxAge: 1200000 },
//   secret: 'my secret'
// }))
// const redis = require("redis"),
// client = redis.createClient();
// const RedisStore = require('connect-redis')(session);
// //var sessionStore = new redisStore({ client : client });
// app.use(session({
//     store: new RedisStore({ client : client }),
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true
// }));
//Passport middleware

app.use(_passport.default.initialize());
app.use(_passport.default.session()); // Connect flashhero

app.use((0, _connectFlash.default)()); // Global Vars

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
}); // Routes

app.use(_index.default); // DB Config

var db = process.env.MONGODB_URI || _keys.default.LOCALDB_URI; // Connect to MongoDB

_mongoose.default.connect(db, {
  useNewUrlParser: true
}).then(function () {
  return console.log('MongoDB Connected...');
}).catch(function (err) {
  return console.log(err);
}); // @route   /
// @desc     Get the landing page
// @access   Public
// @method   GET


app.get('/', function (req, res) {
  return res.render('welcome');
});

if (!module.parent) {
  app.listen(_keys.default.env, function () {
    return console.log("Server running on port ".concat(_keys.default.env));
  });
} // eslint-disable-line no-console
// app.listen(key.env, () => {console.log(`Server running on port ${key.env}`)});


var _default = app;
exports.default = _default;
//# sourceMappingURL=server.js.map