const express = require('express');
const router = express.Router();
const notesQueries = require('../db/queries/notes');

router.get('/', (req, res) => {
  const user = req.session.user;

  if (!user) {
    res.redirect('sessions/login');
    return;
  }

  res.render('notes', { user });
});

router.get('/:id/edit', (req, res) => {
  notesQueries.getNote(req.params.id).then((note) => {
    res.render('edit_note', { note })
  })
});

router.get('/:id/info', (req, res) => {
  notesQueries.getNote(req.params.id).then((note) => {
    const category = {
      1: "Products",
      2: "Books",
      3: "Films/TV Shows",
      4: "Restaurants",
      5: "Other"
    }
    const currentCategory = category[note["category_id"]] || "";
    res.render('info', { note, currentCategory })
  })
})

module.exports = router;
