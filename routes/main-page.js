// routes/main-page.js
const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db/queries/users');

// GET request to render the main page
router.get('/', (req, res) => {
  // keep it the way it is where the req.session is the userID
  //make a query to my db to grab the userwhich matches that id
  // to then set the emailinto my main page

  // Here you can access the email query parameter if needed
  const email = req.session.user.email;

  // Render the main page template
  res.render('main-page', { email: email });
});

module.exports = router;

