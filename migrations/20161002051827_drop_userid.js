
exports.up = function(knex, Promise) {
  return Promise.all([
   knex.schema.table('items', function(table){
     table.dropColumn('user_id');
    })
  ])
};

exports.down = function(knex, Promise) {

};
