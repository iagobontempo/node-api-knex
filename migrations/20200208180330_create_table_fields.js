
exports.up = function (knex) {
    return knex.schema.createTable('fields', table => {
        table.increments('id').primary()
        table.integer('parentId').unsigned().notNullable()
        table.integer('internal').notNull().defaultTo(false)
        table.string('type').notNull()
        table.string('name').notNull()
        table.string('label').notNull()

        table.foreign('parentId').references('id').inTable('pages')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('fields')
};