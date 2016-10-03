const knex = require('./db');

module.exports = {

  deleteItem: function(cb) {
    knex('items')
    .del()
    .where('item_id', '<', 26)

    .asCallback(function(err, results) {
      if (err) console.error(err);
      knex('items').select()
      .asCallback(function(err, results) {
        if (err) console.error(err);
        results.forEach( (element) => {
          const row = element
          cb(row.user_name + ', ' + row.item_name)
        });
        knex.destroy();
      });
    });

  }

}
