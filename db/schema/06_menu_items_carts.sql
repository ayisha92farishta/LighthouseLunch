DROP TABLE IF EXISTS menu_items_carts CASCADE;

CREATE TABLE menu_items_carts (
  id SERIAL PRIMARY KEY NOT NULL,
  cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  qty INTEGER
);

ALTER TABLE menu_items_carts
ADD CONSTRAINT qty_check
CHECK (
	qty > 0
);
