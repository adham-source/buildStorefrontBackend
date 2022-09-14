CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE order_products(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    quantity integer,
    order_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
    product_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY(order_id) REFERENCES orders(id),
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id)
);