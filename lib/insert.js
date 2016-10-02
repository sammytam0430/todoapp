const knex = require('./db');
const show = require('./select');

module.exports = {

  addNewItem: function(item, category, cb) {
    show.user(user, (userId) => {
      knex('items').insert({
        user_id: userId,
        item_name: item,
        item_category: category
      })
      .asCallback(function(err, results) {
        if (err) console.error(err);
        knex.select().from('items')
          .asCallback(function(err, results) {
            if (err) console.error(err);
            cb(results);
          });
        knex.destroy();
      });
    });
  });

}
