
exports.up = function(knex, Promise) {
  return Promise.all([
   knex.schema.table('items', function(table){
     table.dropColumn('category_id');
    //  table.boolean('status').defaultTo('false');
   })
  ])
};


exports.down = function(knex, Promise) {

};
