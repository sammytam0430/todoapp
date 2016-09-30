const knex = require('./db');

// module.exports = {
//
//   all: function(cb) {
//     knex('items').select('*').asCallback( (err, results) => {
//       if (err) return cb(err);
//       cb(null, results);
//     });
//     return knex('items').select('*');
//   }
//
// }

knex.select().from('items')
.asCallback(function(err, rows) {
  if (err) console.error(err);
  console.log(rows);
  knex.destroy();
});
