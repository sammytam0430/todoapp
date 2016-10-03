const knex = require('./db');
const show = require('./select');

module.exports = {

  add: function(item, cb) {

    knex('items').insert({
      item_name: item.name,
      item_category: item.searchVals.type,
      html_block: item
    })
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
