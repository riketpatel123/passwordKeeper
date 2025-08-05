const db = require('../connection');

const getAllPasswords = (options) => {
  const queryParams = [];
  let queryString = `SELECT * FROM user_websites `;
  if (options.categoryId) {
    queryParams.push(Number(options.categoryId));
    queryString += `WHERE category_id = $${queryParams.length} `;
  }
  queryString += `
  ORDER BY id DESC ;`;
  return db.query(queryString, queryParams)
    .then(data => {
      // console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getAllPasswords };
