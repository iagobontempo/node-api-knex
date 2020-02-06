
exports.up = function(knex) {
    return knex.schema.createTable('pages_fields', table => {
        table.increments('id').primary()
        table.integer('pageId').unsigned().notNullable()
        table.string('name')
        table.string('inputType')
        table.string('value')

        table.foreign('pageId').references('id').inTable('pages');
        table.foreign('inputType').references('type').inTable('field_types');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pages_fields');
};
