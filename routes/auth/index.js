const express = require('express');
const loginRoutes = require('./login');
const registerRoutes = require('./register');
const router = express.Router();

router.use('/', loginRoutes);
router.use('/', registerRoutes);

module.exports = router;
