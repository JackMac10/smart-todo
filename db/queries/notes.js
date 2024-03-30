const db = require('../connection');

// Function to add a new note to the database
const create = (note) => {
  const queryText = 'INSERT INTO notes (user_id, note, category) VALUES ($1, $2, $3) RETURNING *';
  const values = [note.userId, note.content, note.categoryId];

  return db.query(queryText, values).then(result => result.rows[0]);
};

const getByUserId = (userId) => {
  return db
    .query('SELECT * FROM notes WHERE user_id = $1;', [userId])
    .then((data) => data.rows);
}

const getAll = () => {
  return db.query('SELECT * FROM notes;').then((data) => data.rows);
};

module.exports = { getAll, getByUserId, create };
