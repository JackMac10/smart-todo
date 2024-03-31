const express = require('express');
const router = express.Router();
const categoriesQueries = require('../db/queries/categories');

// Read all - GET
router.get('/', (req, res) => {
  let query = categoriesQueries.getAll();

  query
    .then((notes) => {
      res.status(201).json({ message: 'Here all categories!', categories });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading categories', error: err.message });
    });
});

module.exports = router;
