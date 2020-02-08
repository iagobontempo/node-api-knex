
exports.up = function (knex) {
    return knex.schema.createTable('field_values', table => {
        table.increments('id').primary()
        table.integer('parentId').unsigned().notNullable()
        table.integer('fieldId').unsigned().notNullable()
        table.string('value')

        table.foreign('parentId').references('id').inTable('pages');
        table.foreign('fieldId').references('id').inTable('fields');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('field_values')
};