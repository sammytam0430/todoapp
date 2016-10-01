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

  userId: function(user, cb) {
    knex.select('users.user_id').from('users')
      .where('users.user_name', user)
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results[0].user_id);
      });
  },

  categoryId: function(category, cb) {
    knex.select('categories.category_id').from('categories')
      .where('categories.category_name', category)
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results[0].category_id);
      });
  }
}
