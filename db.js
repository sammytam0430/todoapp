// DATABASE
module.exports = {
  insertItems: function() {
    knex('items').insert([{
    name: /*items input*/,
    status: false,
    user_id: knex.select().from('users')
      .where('users.name', '=', /*user name input*/)
      .asCallback(function(err, result) {
        if (err) {
          console.error(err);
        }
        console.log(result[0].id);
        knex.destroy();
      }),
    category_id: /*dropdown value*/
    }])
    .asCallback(function(err, rows) {
      knex.select().from('famous_people')
      .asCallback(function(err, rows) {
        if (err) console.error(err);
        console.log(rows);
        knex.destroy();
      });
    });
  }
}
