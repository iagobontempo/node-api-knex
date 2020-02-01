
exports.up = function (knex) {
    return knex.schema.createTable('pages', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('title').notNull()
        table.string('url').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.droptable('pages')
};
