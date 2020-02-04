const db = require('../database/dbConfig');

function postNewWeight(newWeight) {
  return db('weight').insert(newWeight, 'id');
}

module.exports = {
  postNewWeight,
};
