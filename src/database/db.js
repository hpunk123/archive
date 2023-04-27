const { createPool } = require('mysql2/promise')
const { DB_DATABASE,DB_HOST,DB_PASS,DB_USER,DB_PORT } = require('../config')

const poolArchivo = createPool( 
{
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_DATABASE,
    dateStrings: true
})
const sessionDB = {    
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_DATABASE
}

module.exports = { poolArchivo,sessionDB }