const db = require('../database/dbConfig');

function getAllUsers() {
  return db('users').select('username', 'id');
}

function getUserByEmail(email) {
  return db('users')
    .where({ email })
    .first();
}

function registerNewUser(user) {
  return db('users')
    .insert(user, 'id');
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  registerNewUser,
  deleteUser,
};
