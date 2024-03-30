-- Drop and recreate Users table (Example)
-- 01_users.sql
DROP TABLE IF EXISTS notes CASCADE;
CREATE TABLE notes (
  id SERIAL PRIMARY KEY NOT NULL,
  content VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
