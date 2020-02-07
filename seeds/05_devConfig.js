
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dev_config').del()
    .then(function () {
      // Inserts seed entries
      return knex('dev_config').insert([
        {id: 1, menu: "Work here please", tagManagerHead: "<<-- Paste tagManagerHead -->>", tagManagerBody: "<<-- Paste tagManagerBody -->>", messageHost: "smpt.email.com", messageEmail: 'email@contact.com', messagePassword: 'password', messagePort: 587},
      ]);
    });
};
