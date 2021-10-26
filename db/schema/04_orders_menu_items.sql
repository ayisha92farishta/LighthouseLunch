DROP TABLE IF EXISTS order_menu_items CASCADE;

CREATE TABLE order_menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  menu_items_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  qty INTEGER
);
