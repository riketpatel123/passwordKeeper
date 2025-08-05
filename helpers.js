const argon2 = require('argon2');
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


const addNewUser = async function (user) {
  try {
    const hash = await argon2.hash(user.user_password);
    const orgID = await db.query(
      `SELECT id FROM organizations WHERE name = $1`,
      [user.organization_id]
    );
    const newUser = await db.query(
      `INSERT INTO users(FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, ORGANIZATION_ID)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [user.first_name, user.last_name, user.email, hash, Number(orgID.rows[0]['id'])]
    );
    return newUser.rows[0];
  } catch (err) {
    console.log('Error', err);
  }
};
exports.addNewUser = addNewUser;


const getUserByEmail = async function (email) {
  try {
    const user = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (user.rows.length === 0) {
      return null;
    }
    return user.rows[0];
  } catch (err) {
    console.log('Error', err);
  }
};
exports.getUserByEmail = getUserByEmail;


const updateUserEmail = async function (email, id) {
  try {
    const updatedUser = await db.query(
      `
      UPDATE users
      SET email = $1
      WHERE id = $2
      RETURNING *;
      `,
      [email, id]
    );
    return updatedUser;
  } catch (err) {
    console.log('Error', err);
  }
};
exports.updateUserEmail = updateUserEmail;


const updateUserPassword = async function (password, id) {
  try {
    const hash = await argon2.hash(password);
    const updatedUser = await db.query(
      `
      UPDATE users
      SET user_password = $1
      WHERE id = $2
      RETURNING *;
      `,
      [hash, id]
    );
    return updatedUser;
  } catch (err) {
    console.log('Error', err);
  }
};
exports.updateUserPassword = updateUserPassword;


const authenticateUser = async function (email, password) {
  try {
    let user = await getUserByEmail(email);
    if (await argon2.verify(user.user_password, password)) {
      return user;
    } else {
      user = null;
      return user;
    }
  } catch (err) {
    console.log('Error', err);
  }
};
exports.authenticateUser = authenticateUser;
