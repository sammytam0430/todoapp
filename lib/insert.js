const knex = require('./db');
const show = require('./select');

module.exports = {

  addNewItem: function(user, category, cb) {
    show.userId(user, (userId) => {
      show.categoryId(category, (categoryId) => {
        console.log('userId: ' + userId)
        console.log('categoryId: ' + categoryId);
        knex('items').insert({
          user_id: userId,
          item_name: 'Watch Harry Potter',
          category_id: categoryId
        })

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

      });
    });
  }

}
