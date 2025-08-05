DROP TABLE IF EXISTS org_websites CASCADE;

CREATE TABLE org_websites (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(225) NOT NULL,
  account_name VARCHAR(225) NOT NULL,
  password VARCHAR(225) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  organization_id INTEGER REFERENCES organizations(id) ON DELETE CASCADE
);
