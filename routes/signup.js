// routes/signup.js

const express = require('express');
const router = express.Router();
const { addUser, getUserByEmail } = require('../db/queries/users');
const bcrypt = require('bcrypt');
const saltRounds = 10

// GET request to render the signup form
router.get('/', (req, res) => {
  res.render('signup');
});

// POST request to handle signup form submission
router.post('/', (req, res) => {
  const { name, email, password } = req.body;
  console.log("body ----> : ", req.body);

  getUserByEmail(email)
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).render('signup', { error: 'Email already registered' });
      }


      // Add user with hashed password
      return addUser(name, email, password)
        .then(newUser => {
          // Set user session
          req.session.userId = newUser.id;
          // Redirect to homepage after successful signup
          res.redirect('/');
        });
    })
  .catch(error => {
    console.error('Error checking existing user:', error);
    res.status(500).render('signup', { error: 'Internal Server Error' });
  });
});

module.exports = router;

