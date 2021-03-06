
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('items').insert({item_id: 1, item_name: 'Watch 22 Jump Street', user_id: '2', item_category: 'watch'}),
        knex('items').insert({item_id: 2, item_name: 'Have dinner with girlfriend', user_id: '3', item_category: 'eat'}),
        knex('items').insert({item_id: 3, item_name: 'Buy coffee bean and cream', user_id: '1', item_category: 'buy'}),
        knex('items').insert({item_id: 4, item_name: 'Read "How to not screw up in Javascript"', user_id: '2', item_category: 'read'}),
        knex('items').insert({item_id: 5, item_name: 'Watch Supergirl', status: 'false', user_id: '1', item_category: 'watch'}),
      ]);
    });
};
