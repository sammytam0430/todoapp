
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table){
      table.increments('id').primary();
      table.string('name');
    }),
    knex.schema.createTable('categories', function(table){
      table.increments('id').primary();
      table.string('name');
    }),
    knex.schema.createTable('items', function(table){
      table.increments('id').primary();
      table.string('name');
      table.boolean('status');
      table.integer('user_id').references('users.id');
      table.integer('category_id').references('categories.id');
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
