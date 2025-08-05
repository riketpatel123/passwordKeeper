const express = require('express');
const router = express.Router();
const categoriesQuery = require('../db/queries/categories');
const passwordsQuery = require('../db/queries/passwords');
const organizationsQuery = require('../db/queries/organization');
const orgPasswordsQuery = require('../db/queries/orgPasswords');

// GET: /api/passwords/personalPasswords - get personal passwords and websites
router.get('/personalPasswords', (req, res) => {
  passwordsQuery.getAllPasswords(req.query)
    .then(passwords => {
      res.json({ passwords });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// GET: /api/passwords/orgPasswords - get organizations passwords and websites
router.get('/orgPasswords', (req, res) => {
  orgPasswordsQuery.getAllOrgPasswords(req.query)
    .then(passwords => {
      res.json({ passwords });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/categories', (req, res) => {
  categoriesQuery.getcategories()
    .then(categories => {
      res.json({ categories });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/organizations', (req, res) => {
  organizationsQuery.getAllOrganizations()
    .then(organizations => {
      console.log(organizations);
      res.json({ organizations });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});



module.exports = router;
