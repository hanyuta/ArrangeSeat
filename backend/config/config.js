require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'arrange_seat',
    host: process.env.DB_HOST || 'mysql',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'arrange_seat',
    host: process.env.DB_HOST || 'mysql',
    dialect: process.env.DB_DIALECT || 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'arrange_seat',
    host: process.env.DB_HOST || 'mysql',
    dialect: process.env.DB_DIALECT || 'mysql'
  }
}
