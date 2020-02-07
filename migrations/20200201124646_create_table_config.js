
exports.up = function (knex) {
    return knex.schema.createTable('config', table => {
        table.increments('id').primary()
        table.string('siteName')
        table.string('siteTitle')
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
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('config')
};
