const db = require('../connection');

const getAllOrganizations = () => {
  return db.query('SELECT * FROM organizations;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getAllOrganizations };
