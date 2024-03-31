const express = require('express');
const router = express.Router();
const notesQueries = require('../db/queries/notes');

router.get('/', (req, res) => {
  const user = req.session.user;

  if (!user) {
    res.redirect('/login');
  }

  res.render('notes', { user });
});

router.get('/:id/edit', (req, res) => {
  notesQueries.getNote(req.params.id).then((note) => {
    res.render('edit_note', { note })
  })
})

module.exports = router;
