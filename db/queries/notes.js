const db = require('../connection');

// Function to add a new note to the database
const create = (note) => {
  const queryText = 'INSERT INTO notes (user_id, content, category_id) VALUES ($1, $2, $3) RETURNING *';
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

const getNote = (noteId) => {
  return db.query('SELECT * FROM notes INNER JOIN categories ON categories.id = notes.category_id WHERE notes.id = $1;', [noteId])
    .then((data) => data.rows[0]);
}

module.exports = { getAll, getNote, getByUserId, create };
