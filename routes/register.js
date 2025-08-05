// const express = require('express');
// const router = express.Router();

// module.exports = (obj) => {

//   const loggedIn = (req) => {
//     if (req.session.organization_id) return req.session.user_id;
//     return false;
//   };

//   router.get('/', (req, res) => {
//     const user_id = loggedIn(req);

//     if (user_id) {
//       res.redirect('/main');
//     } else {
//       const templateVars = {
//         user_id: req.session['user_id'],
//       };
//       res.render('register', templateVars);
//     }
//   });

//   router.post('/', (req, res) => {
//     const users = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       email: req.body.email,
//       password: req.body.password,
//       organization_id: req.body.organization_id,
//     };

//     obj
//       .getUserByEmail(users.email)
//       .then((user) => {
//         if (user) {
//           return res.send('User already exists!');
//         }
//         obj.addNewUser(users).then((user) => {
//           // req.session['user_id'] = user.id;
//           // req.session['organization_id'] = user.organization_id;
//           return res.redirect('/main');
//         });
//       })
//       .catch((err) => {
//         console.log('Error', err);
//       });
//   });
//   return router;
// };
