
exports.up = function (knex) {
    return knex.schema.createTable('pages', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('uri').notNull()
        table.boolean('status').notNull().defaultTo(false)
        table.string('seoTitle', 60)
        table.string('seoDescription', 170)
        table.boolean('deleted').notNull().defaultTo(false)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('pages')
};
