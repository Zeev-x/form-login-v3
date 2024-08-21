const express = require('express');
const passport = require('passport');
const path = require('path');
const router = express.Router();

// Login form
router.get('/login', (req, res) => {
  res.render('login');
});

// Login route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login?error=' + info.message);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.session.username = user.username;
      res.redirect('/home');
    });
  })(req, res, next);
});

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

module.exports = router;
