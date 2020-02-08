
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('field_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('field_types').insert([
        { id: 1, type: 'text', label: "Text" },
        { id: 2, type: 'textarea', label: "Text Area" },
        { id: 3, type: 'switch', label: "Switch" },
        { id: 4, type: 'select', label: "Select" },
        { id: 5, type: 'image', label: "Image" },
        { id: 6, type: 'file', label: "File" },
        { id: 7, type: 'editor', label: "Editor" }
      ]);
    });
};
