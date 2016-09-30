const knex = require('./db');

module.exports = {

  all: function() {
    knex('items').select('*').asCallback( (err, results) => {
      console.log(err);
      if (err) return cb(err);
      cb(null, results);
    });
    return knex('items').select('*');
  }
  
}
