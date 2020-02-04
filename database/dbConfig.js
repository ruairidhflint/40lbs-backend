const knex = require('knex');
const knexConfig = require('../knexfile.js');

const dbVar = process.env.DB_ENV || 'development';

module.exports = knex(knexConfig[dbVar]);
