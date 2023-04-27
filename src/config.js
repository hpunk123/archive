const { config } = require('dotenv')

config()

const PORT = 800
const DB_HOST = 'localhost'
const DB_PORT = 3306
const DB_USER = 'root'
const DB_PASS = ''
const DB_DATABASE = 'archivodb'

module.exports = { PORT,DB_HOST,DB_PORT,DB_USER,DB_PASS,DB_DATABASE }
