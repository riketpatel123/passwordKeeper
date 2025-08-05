const db = require('../connection');

const deletePassword = (options) => {
  let databaseName;
  if (options.orgWebSite === 'true') {
    databaseName = 'org_websites';
  } else {
    databaseName = 'user_websites';
  }
  let queryString = `DELETE FROM ${databaseName} WHERE id = $1  RETURNING *; `;
  let queryParams = [options.id];
  return db.query(queryString, queryParams)
    .then(data => {
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

module.exports = { deletePassword };
