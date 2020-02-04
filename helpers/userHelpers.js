const db = require('../database/dbConfig');

function getAllUsers() {
  return db('users').select('email', 'confirmed', 'id');
}

function getUserByEmail(email) {
  return db('users')
    .where({ email })
    .first();
}

function getUserByID(id) {
  return db('users')
    .where({ id })
    .first();
}

function registerNewUser(user) {
  return db('users').insert(user, 'id');
}

function deleteUser(id) {
  return db('users')
    .where({ id })
    .del();
}

function confirmUser(id) {
  return db('users')
    .where({ id })
    .update({ confirmed: true });
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserByID,
  registerNewUser,
  deleteUser,
  confirmUser,
};
