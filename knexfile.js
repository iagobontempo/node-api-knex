const { db } = require('./.env');
module.exports = {
  client: 'mysql',
  version: '5.7',
  connection: db,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: '_knex_migrations'
  }
};
