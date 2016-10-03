
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('items', function(table){
      table.text('html_block');
    })
  ])
};

exports.down = function(knex, Promise) {

};
