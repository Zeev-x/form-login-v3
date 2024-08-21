const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const config = require('./config/config.json');
const passport = require('./middleware/passport');

const server = express();

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(session({
  secret: 'Reyette-secreet',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
server.use(passport.initialize());
server.use(passport.session());

// Set view engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

server.use(express.static(path.resolve(__dirname,'public')));

// Routes
const authRoutes = require('./routes/auth');
const protectRoute = require('./routes/protect');
const indexRoutes = require('./routes/index');

server.use('/', authRoutes);
server.use('/', protectRoute);
server.use('/', indexRoutes);

// Error handling
server.use((req,res) => {
  res.render('error/error');
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Terjadi kesalahan!');
});

module.exports = server;
