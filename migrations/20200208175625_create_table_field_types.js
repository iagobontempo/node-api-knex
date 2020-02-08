
exports.up = function (knex) {
    return knex.schema.createTable('field_types', table => {
        table.increments('id').primary()
        table.string('type').notNull().unique()
        table.string('label').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('field_types')
};
