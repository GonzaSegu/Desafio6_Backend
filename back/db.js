require('dotenv').config()
const { Pool } = require('pg')
const {DB_HOST, DB_NAME, DB_USER, DB_PASS, DB_PORT } = process.env

const pool = new Pool({   //crea var para guardar instancia de la DB creada
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    port: DB_PORT,
    allowExitOnIdle: true //en los tiempos muertos, cierra la conexión
})

pool.connect() // devuelve una promesa
    .then(() => console.log('Conectado a base de datos ' + DB_NAME )) //promesa exitosa
    .catch(err => console.error('Error al conectar a la base de datos', err)) //promesa rechazada

module.exports = pool