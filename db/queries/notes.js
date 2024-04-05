const db = require('../connection');

// Function to add a new note to the database
const create = (note) => {
  const queryText = 'INSERT INTO notes (user_id, content, category_id) VALUES ($1, $2, $3) RETURNING *';
  const values = [note.userId, note.content, note.categoryId];

  return db.query(queryText, values).then(result => result.rows[0]);
};

const update = (note) => {
  const queryText = 'UPDATE notes SET content = $1, category_id = $2 WHERE id = $3 RETURNING *';
  const values = [note.content, note.categoryId, note.id];
  return db.query(queryText, values).then((result) => {
    result.rows[0]
  })
}

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

const deleteNote = (noteId) => {
  return db.query('DELETE * FROM notes WHERE notes.id = $1', [noteId])
}

module.exports = { getAll, getNote, getByUserId, create, deleteNote, update };
