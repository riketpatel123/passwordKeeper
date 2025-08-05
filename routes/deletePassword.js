const express = require('express');
const router = express.Router();
const deletePasswordQuery = require('../db/queries/deletePassword');

router.post('/', (req, res) => {
  deletePasswordQuery.deletePassword(req.body)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.send("Fail to delete password");
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
