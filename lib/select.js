"use strict";

const knex = require('./db');

module.exports = {

  detailTrue: function(cb) {
    knex.select().from('items')
    .where('status', 'true')
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results);
      })
    // knex.destroy();
  },

  detailFalse: function(cb) {
    knex.select().from('items')
    .where('status', 'false')
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results);
      })
    // knex.destroy();
  }
}
