const knex = require('./db');
const show = require('./select');

module.exports = {

  addNewItem: function(user, category, item, cb) {
    show.user(user, (userId) => {
      knex('items').insert({
        user_id: userId,
        item_name: item,
        item_category: category
      })

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

    });
  }

}
