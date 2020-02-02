
exports.up = function (knex) {
    return knex.schema.createTable('dev_config', table => {
        table.increments('id').primary()
        table.string('menu')
        table.string('tagManagerHead')
        table.string('tagManagerBody')
        table.string('messageHost').defaultTo('smtp.site.com.br')
        table.string('messageEmail').defaultTo('naoresponda@hotmail.com')
        table.string('messagePassword').defaultTo('SenhaDoEmail545')
        table.string('messagePort').defaultTo('578')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('dev_config')
};
