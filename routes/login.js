const express = require('express');

const router = express.Router();



module.exports = (obj) => {

  router.get('/', (req, res) => {
    res.render('login');
  });

  router.post('/', (req, res) => {
    req.session['user_id'] = 1;
    req.session['organization_id'] = 1;

    res.redirect("/");
  });
  return router;
};
