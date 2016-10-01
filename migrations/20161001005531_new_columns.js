
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('items', function(table){
      table.string('item_category');
      table.string('html_block');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('items', function(table){
      knex.schema.dropColumn('item_category');
      knex.schema.dropColumn('html_block');
    })
  ])
};
