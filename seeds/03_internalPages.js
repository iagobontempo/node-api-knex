
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('internal_pages').del()
    .then(function () {
      // Inserts seed entries
      return knex('internal_pages').insert([
        {
          "id": 1,
          "parentId": 1,
          "name": "Internal Page 1",
          "uri": "internal-page-1",
          "seoTitle": null,
          "seoDescription": null,
          "deleted": 0
        },
        {
          "id": 2,
          "parentId": 1,
          "name": "Internal Page 2",
          "uri": "internal-page-2",
          "seoTitle": null,
          "seoDescription": null,
          "deleted": 0
        },
        {
          "id": 3,
          "parentId": 1,
          "name": "Internal Page 3",
          "uri": "internal-page-3",
          "seoTitle": null,
          "seoDescription": null,
          "deleted": 0
        },
        {
          "id": 4,
          "parentId": 2,
          "name": "Internal Page Other Parent 1",
          "uri": "internal-page-other-1",
          "seoTitle": null,
          "seoDescription": null,
          "deleted": 0
        },
        {
          "id": 5,
          "parentId": 2,
          "name": "Internal Page Other Parent 2",
          "uri": "internal-page-other-2",
          "seoTitle": null,
          "seoDescription": null,
          "deleted": 0
        }
      ]);
    });
};
