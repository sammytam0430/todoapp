const knex = require('./db');

module.exports = {

  usersItems: function(user, cb) {
    knex.select('users.user_name', 'items.item_name').from('users')
      .join('items', 'users.user_id', 'items.user_id')
      .where('users.user_name', user)
      .asCallback(function(err, results) {
        if (err) console.error(err);
        results.forEach( (element) => {
          const row = element
          knex.destroy();
          cb(row.user_name + ', ' + row.item_name)
        });
      })
  },

  user: function(user, cb) {
    knex.select('users.user_id').from('users')
      .where('users.user_name', user)
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results[0].user_id);
      });
  },

  detail: function(cb) {
    knex.select('items.item_name', 'items.item_category', 'items.html_block', 'items.status').from('items')
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results);
      })
  }
}
