// routes/login.js
const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db/queries/users');
const bcrypt = require('bcrypt');

// GET request to render the login form
router.get('/', (req, res) => {
  res.render('login');
});

// POST request to handle login form submission
router.post('/', (req, res) => {
  const { email, password } = req.body;

  getUserByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(401).render('login', { error: 'Invalid email or password' });
      }

      // Hash the provided password for comparison
      bcrypt.compare(password, user.password_hash)
        .then(isPasswordValid => {
          if (!isPasswordValid) {

            return res.status(401).render('login', { error: 'Invalid email or password' });
          }

          // Set user session
          req.session.user = user;
          // Redirect to main-page after successful login
          res.redirect('/main-page');
        })
        .catch(error => {
          console.error('Error comparing passwords:', error);
          res.status(500).render('login', { error: 'Internal Server Error' });
        });
    })
    .catch(error => {
      console.error('Error retrieving user:', error);
      res.status(500).render('login', { error: 'Internal Server Error' });
    });
});

module.exports = router;

