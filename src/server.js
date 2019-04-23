import express from 'express';
import passport from 'passport'
import expressLayouts from 'express-ejs-layouts';
import flash from 'connect-flash';
import session from 'express-session';
import mongoose from 'mongoose';
import key from './config/keys';
import router from './routes/index';
import path from 'path';

const app = express();

// Passport Config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flashhero
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use(router);

// DB Config
const db = key.mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err));

// if (!module.parent) { app.listen(key.env, () => console.log(`Server running on port ${key.env}`)); }// eslint-disable-line no-console

app.get('/users/login', (req, res) => res.render('views/login'));

app.listen(key.env, () => {console.log(`Server running on port ${key.env}`)});

export default app;
