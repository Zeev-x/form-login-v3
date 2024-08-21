const express = require('express');
const fs = require('fs');
const path = require('path');
const usersFile = path.join(__dirname, '../../data', 'users.json');
let users = require(usersFile);
const router = express.Router();

// Registrasi form
router.get('/register', (req, res) => {
  const error = req.query.error || null;
  res.render('register', { error });
});

// Registrasi route
router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.redirect('/register?error=Username, email, dan kedua password harus diisi');
  }

  if (password !== confirmPassword) {
    return res.redirect('/register?error=Password dan konfirmasi password tidak cocok');
  }

  // Validasi email sederhana
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.redirect('/register?error=Email tidak valid');
  }

  // Periksa apakah email sudah digunakan
  const emailExists = users.some((user) => user.email === email);
  if (emailExists) {
    return res.redirect('/register?error=Email sudah digunakan');
  }

  // Periksa apakah username sudah digunakan
  const usernameExists = users.some((user) => user.username === username);
  if (usernameExists) {
    return res.redirect('/register?error=Username sudah digunakan');
  }

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password,
    status: 'allowed' // status bisa 'allowed' atau 'banned'
  };
  users.push(newUser);

  fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error(err);
      return res.redirect('/register?error=Terjadi kesalahan saat menyimpan data');
    }
    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.redirect('/register?error=Terjadi kesalahan saat login');
      }
      req.session.username = newUser.username;
      res.redirect('/home');
    });
  });
});

module.exports = router;
