/* eslint-disable class-methods-use-this */
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../../models/User';


class UsersController {

  getRegistrationPage(req, res) {
    res.render('register');
  }
  
  registerUser(req, res) {
   
   const { name, email, password, password2 } = req.body;
   let errors = [];

   // Check required fields
   if(!name || !email || !password || !password2) {
     errors.push({ msg: 'Please fill in all fields' });
   }

    // Check passwords match
    if(password !== password2) {
      errors.push({ msg: 'Passwords do not match' });
    }

    // Check pass length
    if(password.length < 6) {
      errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if(errors.length > 0) {
      res.render('register', {errors, name, email, password, password2});
    } else {
      // Validation passed
      User.findOne({ email: email })
        .then(user => {
           if(user) {
             // User exists
             errors.push({ msg: 'User already exist with this email' });
             res.render('register', { errors, name, email, password, password2});
           } else {
            const newUser = new User({
              name,
              email,
              password
            });
         
            // Hash password
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              // Set password to hashed
              newUser.password = hash;
              // Save user
              newUser.save()
                 .then(user => {
                   req.flash('success_msg', 'You are now registered and can log in');
                   res.redirect('/users/login');
                 })
                 .catch(err => console.log(err));
            }));
           }
        });
    }
 }

getLoginPage(req, res) {
    res.render('login');
  }

// getWelcomePage(req, res) {
//     res.render('welcome');
//   }

dashboard(req, res) {
  res.render('dashboard', { user: req.user })
}  

login(req, res, next) {
 passport.authenticate('local', {
   successRedirect: '/dashboard',
   failureRedirect: '/users/login',
   failureFlash: true
 })(req, res, next);
}

logout(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
}

}

const UserController = new UsersController();


export default UserController;
