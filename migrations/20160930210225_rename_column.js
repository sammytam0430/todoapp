
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('items', function(table){
      table.renameColumn('items_name', 'item_name');
    })
  ])
};

exports.down = function(knex, Promise) {

};
