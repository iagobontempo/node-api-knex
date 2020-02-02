// Update with your config settings.

module.exports = {

  client: 'mysql',
  version: '5.7',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'node_api'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: '_knex_migrations'
  }


};
