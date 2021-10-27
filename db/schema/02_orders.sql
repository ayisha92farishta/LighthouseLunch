DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  order_created_time TIMESTAMP,
  order_start_time TIMESTAMP,
  order_end_time TIMESTAMP,
  
);
