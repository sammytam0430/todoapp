
exports.up = function(knex, Promise) {
  return Promise.all([
   knex.schema.table('items', function(table){
     table.dropColumn('html_block');
    })
  ])
};

exports.down = function(knex, Promise) {

};
