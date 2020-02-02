const config = require('../knexfile.js');

const knex = require('knex')(config);

// Chama as migrations quando o servidor inicia //
knex.migrate.latest([config]);


module.exports = knex;