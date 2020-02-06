

exports.up = function(knex) {
    return knex.schema.createTable('internal_pages_fields', table => {
        table.increments('id').primary()
        table.integer('pageId').unsigned().notNullable();
        table.integer('internalPagesId').unsigned().notNullable();
        table.string('name').notNull()
        table.string('inputType').unsigned().notNullable();
        table.string('value').notNull()

        table.foreign('pageId').references('id').inTable('pages');
        table.foreign('internalPagesId').references('id').inTable('internal_pages');
        table.foreign('inputType').references('type').inTable('field_types');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('internal_pages_fields');
};
