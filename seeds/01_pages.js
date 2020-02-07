
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('pages').del()
    .then(function () {
      // Inserts seed entries
      return knex('pages').insert([
        {id: 1, name: 'Page 1', uri: 'page-one', status: 1, deleted: false},
        {id: 2, name: 'Page 2', uri: 'page-two', status: 1, deleted: false},
        {id: 3, name: 'Page 3', uri: 'page-three', status: 1, deleted: false}
      ]);
    });
};
