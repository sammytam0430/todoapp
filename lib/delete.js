const knex = require('./db');

module.exports = {

  deleteItem: function(user, itemName, cb) {
    knex('items')
    .del()
    .where('item_name', itemName)

    .asCallback(function(err, results) {
      if (err) console.error(err);
      knex.select('users.user_name', 'items.item_name').from('users')
      .join('items', 'users.user_id', 'items.user_id')
      .where('users.user_name', user)
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
