const knex = require('./db');

module.exports = {

  updateItem: function(user, oldName, newName, cb) {
    knex('items')
    .update('item_name', newName)
    .where('item_name', oldName)

    .asCallback(function(err, results) {
      if (err) console.error(err);
      knex('users').select('users.user_name', 'items.item_name')
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
