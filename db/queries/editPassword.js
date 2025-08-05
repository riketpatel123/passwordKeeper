const db = require('../connection');

const editPassword = (options) => {
  let databaseName;
  if (options.orgWebSite === 'true') {
    databaseName = 'org_websites';
  } else {
    databaseName = 'user_websites';
  }
  let queryString = `UPDATE ${databaseName} SET name=$1, account_name=$2, password=$3
   WHERE id = $4 RETURNING *;`;

  let queryParams = [options.name, options.username, options.password, options.id];
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

module.exports = { editPassword };
