const db = require('../connection');

// Function to add a new user to the database
const addNote= (user_id, note, category) => {

      const queryText = 'INSERT INTO notes (user_id, note, category) VALUES ($1, $2, $3) RETURNING *';
      const values = [user_id, note, category];
      return db.query(queryText, values)
        .then(result => result.rows[0]);
};

module.exports = {addNote};
