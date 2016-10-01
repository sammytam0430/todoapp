const knex = require('./db');

function lookup(user, category) {
  knex.select('users.user_id', 'categories.category_id').from('users')
    .join('items', 'users.user_id', 'items.user_id')
    .join('categories', 'categories.category_id', 'items.category_id')
    // .where('users.user_name', user)
    .orWhere('categories.category_id', category)
    .asCallback(function(err, results) {
      if (err) console.error(err);
      // console.log(results[0].user_id, results[0].category_id);
      console.log(results);
    });
}

lookup('Sammy', 'Watch')
