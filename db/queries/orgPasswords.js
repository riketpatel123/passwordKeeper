const db = require('../connection');

const getAllOrgPasswords = (options) => {
  const queryParams = [];
  let queryString = `SELECT * FROM org_websites `;
  if (options.organizationId) {
    queryParams.push(Number(options.organizationId));
    queryString += `WHERE organization_id = $${queryParams.length} `;
  }
  if (options.categoryId) {
    queryParams.push(Number(options.categoryId));
    queryString += (options.organizationId ? "AND " : "WHERE ") + `category_id = $${queryParams.length} `;
  }
  queryString += `ORDER BY id DESC ;`;
  return db.query(queryString, queryParams)
    .then(data => {
      // console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getAllOrgPasswords };
