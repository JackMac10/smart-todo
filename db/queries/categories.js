const db = require('../connection');

const getAll = () => {
  return db.query('SELECT * FROM categories;').then((data) => data.rows);
};

module.exports = { getAll };
