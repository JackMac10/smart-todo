// routes/login.js
const express = require('express');
const router = express.Router();
const { getUserNotes } = require('../db/queries/users');
const bcrypt = require('bcrypt');
const { addNote } = require('../db/queries/notes');

// GET request to render the login form
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const email = req.session.user.email;
  getUserNotes(id)
    .then(notes => {
      res.render('notes', { notes, email });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/', (req, res) => {
  console.log("Request -->> ", req.body);
  const text = req.body.text;
  const userId = req.session.user.id;
  let category;

  if (text.includes('watch')) {
    category = 'Watch';
  } else if (text.includes('eat')) {
    category = 'Eat';;
  } else if (text.includes('read')) {
    category = 'Read';;
  } else if (text.includes('buy')) {
    category = 'Buy';;
  }

  addNote(userId, text, category)
  .then(() => {
    res.redirect(`/notes/${userId}`);
  })
});


module.exports = router;

