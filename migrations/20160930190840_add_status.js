
exports.up = function(knex, Promise) {
  return Promise.all([
   knex.schema.table('items', function(table){
    //  table.dropColumn('status');
     table.boolean('status').defaultTo('false');
   })
 ])
};

exports.down = function(knex, Promise) {

};
