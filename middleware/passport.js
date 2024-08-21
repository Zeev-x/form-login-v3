const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const usersFile = path.join(__dirname, '../data', 'users.json');
let users = require(usersFile);

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return done(null, false, { message: 'Email atau password salah.' });
  }
  if (user.status === 'banned') {
    return done(null, false, { message: 'Akun Anda telah dibanned.' });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((user) => user.id === id);
  done(null, user);
});

module.exports = passport;
