
exports.up = function (knex) {
    return knex.schema.createTable('config', table => {
        table.increments('id').primary()
        table.string('siteName').defaultTo('Nome do site')
        table.string('siteTitle').defaultTo('Titulo do site')
        table.string('logo')
        table.string('logoFooter')
        table.string('favicon')
        table.string('seoDescription', 170)
        table.string('whatsapp')
        table.string('phone')
        table.string('facebook')
        table.string('linkedin')
        table.string('youtube')
        table.string('email')
        table.string('instagram')
        table.string('messageEmails')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('config')
};
