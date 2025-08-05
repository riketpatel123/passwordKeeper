// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

const db = new Pool(dbParams);

db.connect();

app.set('view engine', 'ejs');

const obj = require("./helpers");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({ name: 'session', keys: ["user_id"], maxAge: 24 * 60 * 60 * 1000 /*24 hours*/ }));

// Separated Routes for each Resource
const userApiRoutes = require('./routes/users-api');
const passwordsApiRoutes = require('./routes/passwords-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const deletePasswordRoutes = require('./routes/deletePassword');
const editPasswordRoutes = require('./routes/editPassword');
const createPasswordRoutes = require('./routes/createPassword');
const logoutRoutes = require('./routes/logout');



// Mount all resource routes
app.use('/api/users', userApiRoutes);
app.use('/api/passwords', passwordsApiRoutes);
app.use('/api/widgets', widgetApiRoutes);

// Note: mount other resources here, using the same pattern above
app.use('/users', usersRoutes(db, obj));

// app.use('/users', usersRoutes);

app.use('/login', loginRoutes(obj));
// app.use('/register', registerRoutes(obj));
app.use('/createPassword', createPasswordRoutes);
app.use('/deletePassword', deletePasswordRoutes);
app.use('/editPassword', editPasswordRoutes);
app.use('/logout', logoutRoutes);


// Home page
app.get('/', (req, res) => {
  let userId = 1;
  if (!userId) {
    return res.redirect("/login");
  } else {
    res.render('index');
  }
});

app.get('/org', (req, res) => {
  let userId = 1;
  if (!userId) {
    return res.redirect("/login");
  } else {
    res.render('org');
  }
});

app.get('/create-password', (req, res) => {
  let userId = 1;
  if (!userId) {
    return res.redirect("/login");
  } else {
    res.render('createPassword');
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
