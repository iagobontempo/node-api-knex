
exports.up = function (knex) {
    return knex.schema.createTable('pages_childs', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('parentId').references('id')
            .inTable('pages')
    })
};

exports.down = function (knex) {
    return knex.schema.droptable('pages_childs')
};
