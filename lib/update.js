const knex = require('./db');

module.exports = {

  updateItem: function(status, item, cb) {
    knex('items')
    .update('status', status)
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
