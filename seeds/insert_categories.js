
exports.seed = function(knex, Promise) {
  return Promise.all([
    // Inserts seed entries
    knex('categories').insert({id: 1, name: 'watch'}),
    knex('categories').insert({id: 2, name: 'eat'}),
    knex('categories').insert({id: 3, name: 'read'}),
    knex('categories').insert({id: 4, name: 'buy'})
  ]);
};
