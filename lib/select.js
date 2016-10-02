const knex = require('./db');

module.exports = {

  detail: function(cb) {
    knex.select().from('items')
      .asCallback(function(err, results) {
        if (err) console.error(err);
        cb(results);
      })
<<<<<<< HEAD
=======
    // knex.destroy();
>>>>>>> 2f2dabf7ecddde0ae884a20d233b87d7f140f3ac
  }
}
