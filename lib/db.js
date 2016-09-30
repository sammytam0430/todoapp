const knex_module = require('knex'); // function

const knex = knex_module(require('../knexfile').development);

module.exports = knex;
