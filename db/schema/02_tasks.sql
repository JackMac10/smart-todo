-- -- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS task CASCADE;
-- DROP TABLE IF EXISTS catagory CASCADE;
-- DROP TABLE IF EXISTS _____ CASCADE;

-- -- CREATE TABLE users (
-- --   id SERIAL PRIMARY KEY NOT NULL,
-- --   name VARCHAR(255) NOT NULL,
-- --   email VARCHAR(255) NOT NULL,
-- --   password VARCHAR(255) NOT NULL
-- -- );

-- CREATE TABLE task (
--   id SERIAL PRIMARY KEY NOT NULL,
--   catagory_id INTEGER REFERENCES catagory(id) ON DELETE CASCADE,
--   content TEXT NOT NULL,
--   date_created DATE NOT NULL DEFAULT now, check this logic
--   completed BOOLEAN NOT NULL DEFAULT TRUE
-- );

-- CREATE TABLE catagory ( // catagory of tasks
--   id SERIAL PRIMARY KEY NOT NULL,
--   task_name VARCHAR(255)
-- );

-- CREATE TABLE _____ (
--   id SERIAL PRIMARY KEY NOT NULL,
--   message TEXT
-- );
