
exports.up = function (knex) {
    return knex.schema.createTable('internal_pages', table => {
        table.increments('id').primary()
        table.integer('parentId').unsigned().notNullable();
        table.string('name').notNull()
        table.string('uri').notNull()
        table.boolean('deleted').notNull().defaultTo(false)

        table.foreign('parentId').references('id').inTable('pages');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('internal_pages')
};
