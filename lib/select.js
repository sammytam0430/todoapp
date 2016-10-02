const knex = require('./db');

module.exports = {

  detail: function(cb) {
    knex.select().from('items')
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results);
      })
  }
}
