/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db, obj) => {

  router.get('/', (req, res) => {
    const user = req.session.user_id;
    db.query(
      `
      SELECT users.*, organizations.name as organization_id
      FROM users
      JOIN organizations ON organizations.id = organization_id
      WHERE users.id = $1
      ;`, [user]
    )
      .then((userInfo) => {
        const info = userInfo.rows[0];
        info.user_id = info.id;
        res.render('/main', main);
      })
      .catch((err => {
        console.log('Error', err);
      }));
  });

  router.post('/email', (req, res) => {
    const id = req.session.user_id;
    const { email } = req.body;
    obj.updateUserEmail(email, id);
    res.send();
  });

  router.post('/password', (req, res) => {
    const id = req.session.user_id;
    const { password } = req.body;
    obj.updateUserPassword(password, id);
    res.send();
  });

  return router;
};
