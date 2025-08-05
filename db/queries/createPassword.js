const db = require('../connection');

const createPassword = (options) => {
  let queryString = `INSERT INTO user_websites (name, account_name, password, category_id, user_id)
  VALUES ($1, $2, $3, $4, $5) RETURNING *; `;

  let queryParams = [options.name, options.username, options.password, options.category_id, options.user_id];
  return db.query(queryString, queryParams)
    .then(data => {
      console.log(data);
      if (data.rowCount > 0) {
        return data.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { createPassword };
