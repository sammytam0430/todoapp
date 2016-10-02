const knex = require('./db');
const show = require('./select');

module.exports = {

  addNewItem: function(item, category, description, cb) {
    show.user(user, (userId) => {
      knex('items').insert({
        item_name: item,
        item_category: category,
        html_block: description
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
  };

}
