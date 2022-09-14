CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE order_status AS ENUM ('active', 'complete');

CREATE TABLE orders(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    user_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
    status order_status NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);