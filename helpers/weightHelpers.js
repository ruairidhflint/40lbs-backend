const db = require('../database/dbConfig');

function postNewWeight(newWeight) {
  return db('weight').insert(newWeight, 'id');
}

function getWeightsById(id) {
  return db('weight')
    .where({ user_id: id })
    .orderBy('id', 'desc')
    .limit(15);
}

module.exports = {
  postNewWeight,
  getWeightsById,
};
