
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('config').del()
    .then(function () {
      // Inserts seed entries
      return knex('config').insert([
        {id: 1, siteName: "Site name", siteTitle: "Site title", whatsapp: "(62) 99999-9999", phone: "62 9999-9999", facebook: "http://facebook.com.br", linkedin: "http://linkedin.com.br", youtube: "http://youtube.com.br", instagram: "http://instagram.com.br"}
      ]);
    });
};
