// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },

  production: {
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
      tableName: 'knex_migrations'
    }
  }

};
