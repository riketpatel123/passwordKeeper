const express = require('express');
const router = express.Router();
const editPasswordQuery = require('../db/queries/editPassword');

router.post('/', (req, res) => {
  editPasswordQuery.editPassword(req.body)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.send("Fail to edit password");
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

