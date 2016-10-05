"use strict";

const knex = require('./db');

function lookup() {
  knex('items').select()
    .asCallback(function(err, results) {
      if (err) console.error(err);
      console.log(results);
    });
  knex.destroy();
}

lookup()
