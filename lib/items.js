const knex = require('./db');

knex.select().from('items')
.asCallback(function(err, rows) {
  if (err) console.error(err);
  console.log(rows);
  knex.destroy();
});
