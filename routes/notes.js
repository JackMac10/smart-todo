const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const user = req.session.user;

  if (!user) {
    res.redirect('/login');
  }

  res.render('notes', { user });
});

module.exports = router;
