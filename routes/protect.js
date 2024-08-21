const express = require('express');
const router = express.Router();

// Protected route
router.use((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
});

module.exports = router;