const db = require('../database/dbConfig');

function postNewWeight(newWeight) {
  return db('weight').insert(newWeight, 'id');
}

function getRecentWeightsById(id) {
  return db('weight')
    .where({ user_id: id })
    .orderBy('id', 'desc')
    .limit(15);
}

function getAllWeightsById(id) {
  return db('weight').where({ user_id: id });
}

module.exports = {
  postNewWeight,
  getRecentWeightsById,
  getAllWeightsById,
};
