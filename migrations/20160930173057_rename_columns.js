
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.renameColumn('id', 'user_id');
      table.renameColumn('name', 'user_name');
    }),
    knex.schema.table('categories', function(table){
      table.renameColumn('id', 'category_id');
      table.renameColumn('name', 'category_name');
    }),
    knex.schema.table('items', function(table){
      table.renameColumn('id', 'item_id');
      table.renameColumn('name', 'items_name');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('items')
  ])
};
