/* loading and initialising the library */
const pgp = require('pg-promise')()

const {DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DATABASE} = process.env

/* Connection string */
/* const connection = 'postgres://saurabh:12345678@localhost:5432/schedulesapp'*/
const connection = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

/* Creating new database instance */
const db = pgp(connection)

/* Export it anywhere you want to use it */
module.exports = db