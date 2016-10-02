const knex_module = require('knex'); // function
const knex = knex_module(require('../../knexfile').development);
const express = require('express');
const items  = express.Router();

module.exports = knex;

function viewAll() {
  items.get('/', (req, res) => {
    knex.select('items.item_name', 'items.item_category', 'items.html_block', 'items.status').from('items')
      .asCallback(function(err, results) {
        if (err) console.error(err);
        results.forEach( (element) => {
          const row = element
          knex.destroy();
          console.log(row.item_name, row.item_category, row.html_block, row.status)
        });
      });
  });
}

viewAll();
