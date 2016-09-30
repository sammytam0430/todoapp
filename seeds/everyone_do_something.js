//
// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('items').del()
//     .then(function () {
//       return Promise.all([
//         // Inserts seed entries
//         knex('items').insert({id: 1, name: 'Watch 22 Jump Street', status: 'false', user_id: '2', category_id: '1'}),
//         knex('items').insert({id: 2, name: 'Have dinner with girlfriend', status: 'false', user_id: '3', category_id: '2'}),
//         knex('items').insert({id: 3, name: 'Buy coffee bean and cream', status: 'false', user_id: '1', category_id: '4'}),
//         knex('items').insert({id: 4, name: 'Read "How to not screw up in Javascript"', status: 'false', user_id: '2', category_id: '3'}),
//         knex('items').insert({id: 5, name: 'Watch Supergirl', status: 'false', user_id: '1', category_id: '1'}),
//       ]);
//     });
// };
