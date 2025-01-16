require('dotenv').config()
const { Pool } = require('pg')
const {DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env

const DB = new Pool({   //crea var para guardar instancia de la DB creada
    host: DB_HOST ,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: 5434,
    allowExitOnIdle: true //en los tiempos muertos, cierra la conexión
})

module.exports = { DB }