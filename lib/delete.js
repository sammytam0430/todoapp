"use strict";

const knex = require('./db');

module.exports = {

  deleteItem: function(item, cb) {
    knex('items')
    .del()
    .where('item_name', 'like', '%' + item + '%')

    .asCallback(function(err, results) {
      if (err) console.error(err);
      knex.select().from('items')
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results);
      });
    });
  }

}
