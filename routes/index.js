const express = require('express');
const router = express.Router();

// Main route
router.get('/', (req,res) => {
  res.redirect('/home');
});

router.get('/home', (req,res) => {
  res.render('page/home');
});



module.exports = router;
