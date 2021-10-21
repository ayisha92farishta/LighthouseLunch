-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS cartss CASCADE;
CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
);
