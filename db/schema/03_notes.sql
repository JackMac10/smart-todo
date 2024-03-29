-- Drop and recreate Users table (Example)
-- 01_users.sql
DROP TABLE IF EXISTS notes CASCADE;
CREATE TABLE notes (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  note VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL
);
