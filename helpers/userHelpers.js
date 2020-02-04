const db = require('../database/dbConfig');

function getAllUsers() {
  return db('users').select('email', 'confirmed', 'id');
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
