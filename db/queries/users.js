// queries/users.js

const db = require('../connection');
const bcrypt = require('bcryptjs');

// Function to add a new user to the database
const addUser = (name, email, password) => {
  return bcrypt.hash(password, 10)
    .then(hashedPassword => {
      const queryText = 'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
      const values = [name, email, hashedPassword];
      return db.query(queryText, values)
        .then(result => result.rows[0]);
    });
};


// Function to find a user by email
const getUserByEmail = (email) => {
  const queryText = 'SELECT * FROM users WHERE email = $1';
  return db.query(queryText, [email])
    .then(result => result.rows[0])
    .then(user => {
      if (user) {
        return { ...user, password: user.password_hash }; // Include the hashed password in the user object
      }
      return null;
    });
};

const getUserNotes = (id) => {
  const queryString = 'SELECT * FROM notes WHERE user_id = $1;'

  return db.query(queryString, [id])
    .then(result => result.rows)
    .catch(err => console.log(err));
}

const getUserById = (id) => {
  const queryText = 'SELECT * FROM users WHERE id = $1';
  return db.query(queryText, [id])
    .then(result => result.rows[0]);
};

module.exports = { addUser, getUserByEmail, getUserNotes };

