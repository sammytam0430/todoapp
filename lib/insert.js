const knex = require('./db');
const show = require('./select');

module.exports = {

  add: function(item, cb) {
    show.user(user, (userId) => {
      knex('items').insert({
        item_name: item.item_name,
        item_category: item.item_category,
        html_block: item.html_block
      })
      .asCallback(function(err, results) {
        if (err) console.error(err);
        knex.select().from('items')
          .asCallback(function(err, results) {
            if (err) console.error(err);
            cb(results);
          });
      });
    knex.destroy();
    });
  }

}
