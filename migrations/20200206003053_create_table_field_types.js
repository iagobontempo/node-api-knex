
exports.up = function(knex) {
    return knex.schema.createTable('field_types', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('type')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('field_types');
};
