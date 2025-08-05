-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(225) NOT NULL,
  email VARCHAR(225) NOT NULL,
  password VARCHAR(225) NOT NULL,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE
);
