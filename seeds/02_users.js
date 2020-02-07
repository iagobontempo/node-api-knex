
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'ADMIN User', email: "admin@admin.com", password: "$2a$10$mOoeCzbf6UYGwMMUzjjMMe3tXClzH3MEzPQkXna7anhdtQHp22LnW", admin: true, dev: false},
        {id: 2, name: 'DEV User', email: "dev@dev.com", password: "$2a$10$mOoeCzbf6UYGwMMUzjjMMe3tXClzH3MEzPQkXna7anhdtQHp22LnW", admin: true, dev: true}
      ]);
    });
};
