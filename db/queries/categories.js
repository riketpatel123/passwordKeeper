const db = require('../connection');

const getcategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { getcategories };
