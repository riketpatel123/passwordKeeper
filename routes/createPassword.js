const express = require('express');
const router = express.Router();
const createPasswordsQuery = require('../db/queries/createPassword');

router.post('/', (req, res) => {
  const userId = req.session.userId;
  createPasswordsQuery.createPassword({ ...req.body, user_id: userId })
    .then((data) => {
      if (data) {
        res.redirect(`/`);
      } else {
        res.send("Fail to create password");
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
